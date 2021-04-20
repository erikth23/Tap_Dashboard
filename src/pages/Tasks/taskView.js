import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  FormGroup
} from 'reactstrap';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import { listUsers, update } from '../../graphql/queries';
import { createNote } from '../../graphql/mutations';
import { onCreateNote, onDeleteTask } from '../../graphql/subscriptions';
import {useTranslation} from 'react-i18next';

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

const TaskView = ({setViewTask, system, _task, runUpdateTask, username }) => {

  const [task, setTask] = useState(_task);
  const [updated, setUpdated] = useState(false);
  const [newComment, setNewComment] = useState();
  const [subscriptions, setSubscriptions] = useState([]);

  const [users, setUsers] = useState([]);
  const {i18n} = useTranslation();

  useEffect(() => {
    if(system) {
      getUsers();
    }
  }, [system])

  useEffect(() => {
    if(_task && system) {
        setTask(_task)
        setupSubscriptions();
        return clearSubscriptions();
    }
  }, [_task, system])

  const getUsers = async () => {
    const filter = {
      systemID: {
        eq: system
      }
    }
    await API.graphql({query: listUsers, variables: {filter: filter}})
    .then(res => setUsers(res.data.listUsers.items))
    .catch(err => console.log(err))
  }

  const setupSubscriptions = async () => {

    const deleteSub = await API.graphql({query: onDeleteTask, variables: {id: task.id}})
    .subscribe({
      next: event => setViewTask(null),
      error: error => console.error(error)
    })

    const commentCreateSub = await API.graphql({query: onCreateNote, variables: {taskOrAssetID: task.id}})
    .subscribe({
      next: event => {
        const new_comment = event.value.data.onCreateNote.comment.includes("{") ?
          {...event.value.data.onCreateNote,
            comment: JSON.parse(event.value.data.onCreateNote.comment.replace("{", "{\"").replaceAll(", ", "\",\"").replaceAll("=", "\":\"").replace("}", "\"}"))
          } : event.value.data.onCreateNote
        task.comments.push(new_comment)
        setTask({...task});
      },
      error: error => console.error(error)
    })

    setSubscriptions([...subscriptions, deleteSub, commentCreateSub])
  }

  const clearSubscriptions = () => {
    subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    setSubscriptions([]);
  }

  const addComment = async () => {
    const note = {
      comment: newComment,
      userID: `${system}-${username}`,
      taskOrAssetID: task.id,
      locale: i18n.language
    }

    let result = null;
    await API.graphql({query: createNote, variables: {input: note}})
    .then(res => {
      result = note;
      console.log(res)
    }).catch(err => {
      result = err;
      console.console.error(err);
    })

    await axios.post(LOGEVENT_API, {
      meta: {
        systemID: system,
        userID: `${system}-${username}`,
        graphql: 'createNote'
      },
      event: result
    })
  }

  if(!task) {
    return (
      <React.Fragment>
        <div>Loading...</div>
      </React.Fragment>
    )
  } else {
    return(<React.Fragment>
      <Card>
          <CardTitle className='mt-3 ml-3'>{typeof task.title == "string" ? task.title : task.title[i18n.language]}</CardTitle>
          <CardBody>
            <div>
              <h5>Description</h5>
              <p>{typeof task.title == "string" ? task.shortDescription : task.shortDescription[i18n.language]}</p>
            </div>
            <div className='mt-3'>
              <h5>Task Status</h5>
              <TaskDropdown initial={taskStatusArr.find(status => task.status == status.value).label} changeFunction={(res) => {
                  setUpdated(true);
                  setTask({...task, status: res.value});
                }} items={taskStatusArr}/>
            </div>
            <div className='mt-3'>
              <h5>Assignee</h5>
              <TaskDropdown initial={task.user ? task.user.userName : 'nouser'} changeFunction={(res) => {
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
              {task.comments && task.comments.sort((a,b) => b.createdAt - a.createdAt).map(comment => {
                console.log(comment)
                return <Comment comment={comment}/>
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

}

export default TaskView;
