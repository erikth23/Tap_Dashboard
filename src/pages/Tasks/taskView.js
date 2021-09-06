import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  FormGroup
} from 'reactstrap';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {DataStore, SortDirection} from 'aws-amplify';

import {Note, User} from '../../models';

import TaskDropdown from './taskDropdown';
import Comment from './comment';

const taskStatusArr = [
  {
    value: 'NOTTAKEN',
    label: 'Not Taken'
  },
  {
    value: 'INPROGRESS',
    label: 'In Progress'
  },
  {
    value: 'STUCK',
    label: 'Stuck'
  },
  {
    value: 'COMPLETED',
    label: 'Completed'
  }]

const LOGEVENT_API = "https://ji7sxv0nt2.execute-api.us-east-1.amazonaws.com/default/LogEvent";

const TaskView = ({setViewTask, systemID, _task, runUpdateTask, username }) => {

  const [task, setTask] = useState(_task);
  const [updated, setUpdated] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState();

  const [users, setUsers] = useState([]);
  const {i18n} = useTranslation();
  const commaRegexp = /, (?=\w{2,3}=)/g

  useEffect(() => {
    if(systemID) {
      getUsers();
    }
  }, [systemID])

  useEffect(() => {
    if(_task) {
        setTask(_task)
        getComments()

        const subscription = DataStore.observe(Note).subscribe(() => {
          getComments();
        })

        return () => {
          subscription.unsubscribe()
        }
    }
  }, [_task])

  const getUsers = async () => {
    try {
      const _users = await DataStore.query(User, c => c.systemID('eq', systemID));
      setUsers(_users)
    } catch (err) {
      console.error(err)
    }
  }

  const getComments = async () => {
    try {
      const _comments = await DataStore.query(Note, c => c.taskOrAssetID('eq', _task.id), {
        sort: s => s.createdAt(SortDirection.ASCENDING)
      });
      setComments(_comments)
    } catch (err) {
      console.error(err)
    }
  }

  const addComment = async () => {
    const note = {
      comment: newComment,
      userID: `${systemID}-${username}`,
      taskOrAssetID: task.id,
      locale: i18n.language
    }

    let result = null;
    try {
      await DataStore.save(new Note(note))
    } catch (err) {
      console.error(err)
    }

    axios.post(LOGEVENT_API, {
      meta: {
        systemID: systemID,
        userID: `${systemID}-${username}`,
        graphql: 'createNote'
      },
      event: result
    })
  }

  const translate = (text) => {
    return !text.includes('{') ?
        text
      : (text.includes('=') ?
          JSON.parse(text
              .replace("{", "{\"")
              .replaceAll(commaRegexp, "\",\"")
              .replaceAll("=", "\":\"")
              .replace("}", "\"}"))[i18n.language]
        : JSON.parse(text)[i18n.language])
  }

    return(<React.Fragment>
      <Card>
          <CardTitle className='mt-3 ml-3'>{translate(task.title)}</CardTitle>
          <CardBody>
            <div>
              <h5>Description</h5>
              <p>{translate(task.shortDescription)}</p>
            </div>
            <div className='mt-3'>
              <h5>Task Status</h5>
              <TaskDropdown initial={taskStatusArr.find(status => task.status === status.value).label} changeFunction={(res) => {
                  setUpdated(true);
                  setTask({...task, status: res.value});
                }} items={taskStatusArr}/>
            </div>
            <div className='mt-3'>
              <h5>Assignee</h5>
              <TaskDropdown initial={task.userID.split('-')[1] || 'nouser'} changeFunction={(res) => {
                  setUpdated(true);
                  setTask({...task, userID: res.value, user: {userName: res.label}});
                }} items={users.map(user => ({value: user.id, label: user.userName}))}/>
            </div>
            {
              task.asset &&
              <div className='mt-3'>
                <h5>Asset</h5>
                <p>{task.asset.name}</p>
              </div>
            }
            <div>
              <h5 className='mt-3 mb-2'>Comments</h5>
              {comments.map(comment => {
                return <Comment comment={{...comment, comment: translate(comment.comment)}}/>
              })}
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Add Comment" onChange={(event) => setNewComment(event.target.value)}/>
              </div>
              <FormGroup>
                <div>
                  <Button type="submit" color="primary" className="mr-1" onClick={() => addComment()}>
                    Add
                  </Button>{" "}
                  {//success && <Badge pill="pill" className="badge-soft-success mr-1 ml-3">Success</Badge>
                  }
                  {//failure && <Badge pill="pill" className="badge-soft-danger mr-1 ml-3">Failed</Badge>
                  }
                </div>
              </FormGroup>
            </div>
            <Link to="/tasks"
              className={`btn ${updated ? 'btn-primary' : 'btn-secondary'} waves-effect waves-light btn-sm`}
              onClick={() => {
                setUpdated(false)
                runUpdateTask(task)
              }}>
              Save
            </Link>
          </CardBody>
      </Card>
    </React.Fragment>)

}

export default TaskView;
