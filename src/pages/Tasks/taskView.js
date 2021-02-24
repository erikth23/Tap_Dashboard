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
import {API, graphqlOperation, Auth} from 'aws-amplify';
import { listUsers, update } from '../../graphql/queries.js';
import { updateTask } from '../../graphql/mutations.js';

import TaskDropdown from './taskDropdown';
import Comment from './comment';

const NOT_TAKEN = 'NOTTAKEN';
const IN_PROGRESS = 'INPROGRESS';
const STUCK = 'STUCK';
const COMPLETED = 'COMPLETED';

const TaskView = (props) => {

  const [status, setStatus] = useState(props.task.status);
  // const [owner, setOwner] = useState(props.task.owner ? props.task.owner.email : null);
  // const [newComment, setNewComment] = useState();
  // const [success, setSuccess] = useState(false);
  // const [failure, setFailure] = useState(false);
  // const room = props.system.rooms.find(room => room._id == props.task.room);
  // let user = JSON.parse(localStorage.getItem("authUser")).user;

  const [awsUsers, setAwsUsers] = useState([]);

  useEffect(() => {
    if(props.system) {
      getAwsUsers();
    }
  }, [props.system])

  const getAwsUsers = async () => {
    const filter = {
      systemID: {
        eq: props.system
      }
    }
    await API.graphql({query: listUsers, variables: {filter: filter}})
    .then(res => setAwsUsers(res.data.listUsers.items))
    .catch(err => console.log(err))
  }

  const updateStatus = async (status) => {
    const oldStatus = props.task.status;
    props.task.status = status;

    const input = {
      id: props.task.id,
      status: status
    }
    await API.graphql({query: updateTask, variables: { input: input}})
    .then(res => console.log(res))
    .catch(err => {
      props.task.status = oldStatus;
      console.log(err);
    })
  }
  //
  // const updateOwner = async (email) => {
  //   setOwner(email);
  //   let result = await axios.post(process.env.REACT_APP_APIURL + '/task/update', {taskID: props.task._id, email: email}).then((result) => {
  //     return result;
  //   }).catch(error => {
  //     return null;
  //   });
  //   if(!result) {
  //     if(props.task.owner) setOwner(null);
  //     else setOwner(props.task.owner.email)
  //   }
  // }
  //
  // const addComment = () => {
  //   axios.post(process.env.REACT_APP_APIURL + '/task/addComment', {
  //     taskID: props.task._id,
  //     comment: newComment,
  //     email: user.email
  //   }).then(result => {
  //     props.task.comments.push({
  //       _user: {firstName: user.firstName, lastName: user.lastName},
  //       timestamp: new Date(),
  //       comment: newComment
  //     })
  //     setSuccess(true);
  //     setNewComment();
  //   }).catch(error => {
  //     console.log(error);
  //   })
  //   const timer = setTimeout(() => {
  //     setSuccess(false);
  //   }, 2000)
  // }

  return(<React.Fragment>
    <Card>

        <CardTitle className='mt-3 ml-3'>{props.systemID}</CardTitle>
        <CardBody>
          <div>
            <h5>Description</h5>
            <p>{props.task.shortDescription}</p>
          </div>
          <div className='mt-3'>
            <h5>Task Status</h5>
            <TaskDropdown initial={props.task.status} changeFunction={updateStatus} items={[NOT_TAKEN, IN_PROGRESS, STUCK, COMPLETED]}/>
          </div>
          {
            // <div className='mt-3'>
            //   <h5>Assignee</h5>
            //   <TaskDropdown initial={owner} changeFunction={updateOwner} items={props.system.users.map(user => user._user.email)}/>
            // </div>
          }
          {
            props.task.asset &&
            <div className='mt-3'>
              <h5>Asset</h5>
              <p>{props.task.asset.name}</p>
            </div>

          // <div>
          //   <h5 className='mt-3 mb-2'>Comments</h5>
          //   {props.task.comments.map(comment => {
          //     return <Comment comment={comment}/>
          //   })}
          //   <div className="form-group">
          //     <input className="form-control" type="text" placeholder="Add Comment" onChange={(event) => setNewComment(event.target.value)}/>
          //   </div>
          //   <FormGroup>
          //     <div>
          //       <Button type="submit" color="primary" className="mr-1" onClick={() => addComment()}>
          //         Add
          //       </Button>{" "}
          //       {success && <Badge pill="pill" className="badge-soft-success mr-1 ml-3">Success</Badge>}
          //       {failure && <Badge pill="pill" className="badge-soft-danger mr-1 ml-3">Failed</Badge>}
          //     </div>
          //   </FormGroup>
          // </div>
        }
        </CardBody>
    </Card>
  </React.Fragment>)
}

export default TaskView;
