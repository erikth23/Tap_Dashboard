import React from 'react';
import {
  Card,
  CardBody,
  CardTitle
} from 'reactstrap';

const Comment = ({comment}) => {

  const fullName = comment.user.firstName;
  const timestamp = new Date(comment.createdAt);
  return(
    <React.Fragment>
      <Card>
        <div className='mt-2 ml-2'>
          <h5>{fullName}<span style={{color: 'gray', fontSize: '10px'}}>{timestamp.toLocaleString()}</span></h5>
        </div>
        <CardBody>
          <div>{comment.comment}</div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default Comment;
