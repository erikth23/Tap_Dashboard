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
import { createNote, updateTask } from '../../graphql/mutations';
import { onCreateNote, onDeleteTask } from '../../graphql/subscriptions';

import TaskDropdown from './taskDropdown';
import Comment from './comment';

const NOT_TAKEN = 'NOTTAKEN';
const IN_PROGRESS = 'INPROGRESS';
const STUCK = 'STUCK';
const COMPLETED = 'COMPLETED';

const TaskView = ({setViewTask, system, _task, runUpdateTask, user }) => {

  const [task, setTask] = useState(_task);
  const [updated, setUpdated] = useState(false);
  const [newComment, setNewComment] = useState();
  const [subscriptions, setSubscriptions] = useState([]);

  const [users, setUsers] = useState([]);

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
        task.comments.items.push(event.value.data.onCreateNote)
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
      userID: user.id,
      taskOrAssetID: task.id
    }
    await API.graphql({query: createNote, variables: {input: note}})
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }

  return(<React.Fragment>
    <Card>
        <CardTitle className='mt-3 ml-3'>{task.title}</CardTitle>
        <CardBody>
          <div>
            <h5>Description</h5>
            <p>{task.shortDescription}</p>
          </div>
          <div className='mt-3'>
            <h5>Task Status</h5>
            <TaskDropdown initial={task.status} changeFunction={(value) => {
                setUpdated(true);
                setTask({...task, status: value});
              }} items={[NOT_TAKEN, IN_PROGRESS, STUCK, COMPLETED]}/>
          </div>
          <div className='mt-3'>
            <h5>Assignee</h5>
            <TaskDropdown initial={task.userID} changeFunction={(value) => {
                setUpdated(true);
                setTask({...task, userID: value});
              }} items={users.map(user => user.userName)}/>
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
            {task.comments.items.map(comment => {
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

export default TaskView;
