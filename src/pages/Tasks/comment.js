import React from 'react';
import {
  Card,
  CardBody,
} from 'reactstrap';
import {useTranslation} from 'react-i18next';

const Comment = ({comment}) => {

  const {i18n} = useTranslation();

  const userName = comment.userID.split('-')[1];
  const timestamp = new Date(comment.createdAt);
  return(
    <React.Fragment>
      <Card>
        <div className='mt-2 ml-2'>
          <h5>{userName}<span style={{color: 'gray', fontSize: '10px'}}>{timestamp.toLocaleString()}</span></h5>
        </div>
        <CardBody>
          <div>{typeof comment.comment == "string" ? comment.comment : comment.comment[i18n.language]}</div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default Comment;
