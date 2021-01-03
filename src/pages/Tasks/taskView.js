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

import TaskDropdown from './taskDropdown';
import Comment from './comment';

const NOT_TAKEN = 'NOT_TAKEN';
const IN_PROGRESS = 'IN_PROGRESS';
const STUCK = 'STUCK';
const COMPLETED = 'COMPLETED';

const TaskView = (props) => {

  const [status, setStatus] = useState(props.task.status);
  const [owner, setOwner] = useState(props.task.owner ? props.task.owner.email : null);
  const [newComment, setNewComment] = useState();
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const room = props.system.rooms.find(room => room._id == props.task.room);
  let user = JSON.parse(localStorage.getItem("authUser")).user;

  const updateStatus = async (status) => {
    setStatus(status);
    let result = await axios.post(process.env.REACT_APP_APIURL + '/task/updateStatus', {taskID: props.task._id, status: status}).then((result) => {
      return result;
    }).catch(error => {
      return null;
    });
    if(!result) {
      setStatus(props.task.status);
    }
  }

  const updateOwner = async (email) => {
    setOwner(email);
    let result = await axios.post(process.env.REACT_APP_APIURL + '/task/assignTask', {taskID: props.task._id, email: email}).then((result) => {
      return result;
    }).catch(error => {
      return null;
    });
    if(!result) {
      if(props.task.owner) setOwner(null);
      else setOwner(props.task.owner.email)
    }
  }

  const addComment = () => {
    axios.post(process.env.REACT_APP_APIURL + '/task/addComment', {
      taskID: props.task._id,
      comment: newComment,
      email: user.email
    }).then(result => {
      props.task.comments.push({
        _user: {firstName: user.firstName, lastName: user.lastName},
        timestamp: new Date(),
        comment: newComment
      })
      setSuccess(true);
      setNewComment();
    }).catch(error => {
      console.log(error);
    })
    const timer = setTimeout(() => {
      setSuccess(false);
    }, 2000)
  }

  return(<React.Fragment>
    <Card>
      <CardTitle className='mt-3 ml-3'>{props.task.title}</CardTitle>
      <CardBody>
        <div>
          <h5>Description</h5>
          <p>{props.task.shortDescription}</p>
        </div>
        <div className='mt-3'>
          <h5>Task Status</h5>
          <TaskDropdown initial={status} changeFunction={updateStatus} items={[NOT_TAKEN, IN_PROGRESS, STUCK, COMPLETED]}/>
        </div>
        <div className='mt-3'>
          <h5>Assignee</h5>
          <TaskDropdown initial={owner} changeFunction={updateOwner} items={props.system.users.map(user => user._user.email)}/>
        </div>
        <div className='mt-3'>
          <h5>Room</h5>
          <p>{room && room.name}</p>
        </div>
        <div>
          <h5 className='mt-3 mb-2'>Comments</h5>
          {props.task.comments.map(comment => {
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
              {success && <Badge pill="pill" className="badge-soft-success mr-1 ml-3">Success</Badge>}
              {failure && <Badge pill="pill" className="badge-soft-danger mr-1 ml-3">Failed</Badge>}
            </div>
          </FormGroup>
        </div>
      </CardBody>
    </Card>
  </React.Fragment>)
}

export default TaskView;
