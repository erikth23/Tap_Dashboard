import React from 'react';
import {
  Card,
  CardBody,
  CardTitle
} from 'reactstrap';

const Comment = (props) => {

  const fullName = props.comment._user.firstName + ' ' + props.comment._user.lastName;
  const timestamp = new Date(props.comment.timestamp);
  return(
    <React.Fragment>
      <Card>
        <div className='mt-2 ml-2'>
          <h5>{fullName}<span style={{color: 'gray', fontSize: '10px'}}>{timestamp.toLocaleString()}</span></h5>
        </div>
        <CardBody>
          <div>{props.comment.comment}</div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default Comment;
