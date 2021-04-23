import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import {
  Badge,
  Button,
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Spinner
} from "reactstrap";
import {BrowserRouter as Router, useHistory} from 'react-router-dom';
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useTranslation } from 'react-i18next';
import {API, Auth, DataStore} from 'aws-amplify';

import {Asset, Task} from '../../models';
import { getUser, getSystem } from '../../graphql/queries.js';
import { createTask } from '../../graphql/mutations.js';

import {useSystems, useTasks} from '../../helpers/hooks';

const LOGEVENT_API = "https://ji7sxv0nt2.execute-api.us-east-1.amazonaws.com/default/LogEvent";

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

const AddTask = (props) => {

  const [success, setSuccess] = useState(false);
  const [assets, setAssets] = useState([]);
  const [cognitoUser, setCognitoUser] = useState();
  const history = useHistory();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    Auth.currentSession().then(data => setCognitoUser({
      username: data.idToken.payload["cognito:username"],
      systemID: data.idToken.payload["custom:systemID"]
    }))
  }, [])

  useEffect(() => {
    if(cognitoUser && cognitoUser.systemID) {
        getAssets()
    }
  }, [cognitoUser])

  const getAssets = async () => {
    try {
      const _assets = await DataStore.query(Asset, c => c.systemID('eq', cognitoUser.systemID))
      setAssets(_assets)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (event, error, values) => {
    const input = {
      systemID: cognitoUser.systemID,
      title: values.title,
      shortDescription: values.shortDescription,
      locale: i18n.language,
      status: values.stat,
      assetID: values.assetID || assets[0].id,
      userID: 'nouser',
    }

    console.log(input);

    let result = null;
    try {
      await DataStore.save(new Task(input))
      result = input;
    } catch (err) {
      result = err;
      console.error(err)
    }

    await axios.post(LOGEVENT_API, {
      meta: {
        systemID: cognitoUser.systemID,
        userID: `${cognitoUser.systemID}-${cognitoUser.username}`,
        graphql: 'updateTask'
      },
      event: result
    })

    history.push('/tasks')
  }


  if(!cognitoUser) {
    return (
      <React.Fragment>
        <div>
          Loading...
        </div>
      </React.Fragment>
    )
  } else {
    const defaultValues = {
      systemID: cognitoUser.systemID,
      title: '',
      shortDescription: '',
      status: 'NOTTAKEN',
      assetID: ''
    }
    return (<React.Fragment>
      <div className="page-content">
        <Container fluid="fluid">
          <Breadcrumbs title={t('Tasks')} breadcrumbItem={t('Add Task')}/>
          <Row>
            <Col>
              <Card>
                <CardTitle className='mt-4 ml-4'>Add Task</CardTitle>
                <CardBody>
                  <AvForm onSubmit={handleSubmit} model={defaultValues}>
                    <AvField
                      name="title"
                      label="Title "
                      placeholder="Title of the task"
                      type="text"
                      errorMessage="This field is required"
                      validate={{
                        required: {value: true}
                      }}
                    />
                    <AvField
                      name="shortDescription"
                      label="Short Description "
                      placeholder="Brief Description of the Task"
                      type="text"
                      errorMessage="This field is required"
                      validate={{
                        required: {value: true}
                      }}
                    />
                    <AvField type='select' name='assetID' label='Asset for Task'>
                      {
                        assets.map(asset => {
                          return <option value={asset.id}>{asset.name}</option>
                        })
                      }
                    </AvField>
                    <AvField type="select" name="stat" label="Status">
                      {taskStatusArr.map(status => <option value={status.value}>{status.label}</option>)}
                    </AvField>
                    <FormGroup>
                      <div>
                        <Button type="submit" color="primary" className="mr-1">
                          Submit
                        </Button>{" "}
                        <Button type="reset" color="secondary">
                          Cancel
                        </Button>
                        {success && <Badge pill="pill" className="badge-soft-success mr-1 ml-3">Success</Badge>}
                      </div>
                    </FormGroup>
                </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>)
  }
}

export default AddTask;
