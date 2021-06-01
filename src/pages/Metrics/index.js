import React, {useEffect, useState} from "react";
import {
  Col,
  Container,
  Row
} from "reactstrap";
import { Auth, DataStore } from 'aws-amplify';
import { useTranslation } from 'react-i18next';

import CleaningTimeBar from "./CleaningTimeBar";

import Breadcrumbs from '../../components/Common/Breadcrumb';

const Metrics = (props) => {
  const [cognitoUser, setCognitoUser] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    Auth.currentSession().then(data => {
      setCognitoUser({
        username: data.idToken.payload["cognito:username"],
        systemID: data.idToken.payload["custom:systemID"]
      })
    })
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Breadcrumbs title={t('Metrics')} breadcrumbItem={t('Metrics')}/>
          <Row>
            <Col xl="10">
              {
                cognitoUser &&
                <CleaningTimeBar systemID={cognitoUser.systemID}/>
              }
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Metrics;
