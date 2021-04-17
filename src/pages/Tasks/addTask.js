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
import {API, Auth} from 'aws-amplify';

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
  const [system, setSystem] = useState({});
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
    if(cognitoUser) {
        getDBSystem();
    }
  }, [cognitoUser])

  const getDBSystem = async () => {
    await API.graphql({query: getSystem, variables: {id: cognitoUser.systemID}})
    .then(res => setSystem(res.data.getSystem))
    .catch(err => console.log(err));
  }

  const handleSubmit = async (event, error, values) => {
    const input = {
      systemID: system.id,
      localeTaskInput: {
        locale: i18n.language,
        title: values.title,
        shortDescription: values.shortDescription,
      },
      status: values.stat,
      assetID: values.assetID || system.assets.items[0].id,
      userID: 'nouser',
    }

    console.log(input);

    let result = null;
    await API.graphql({query: createTask, variables: {input: input}})
    .then(res => {
      result = input;
      console.log(res)
    }).catch(err => {
      result = err;
      console.log(err)
    })

    await axios.post(LOGEVENT_API, {
      meta: {
        systemID: system.id,
        userID: `${cognitoUser.systemID}-${cognitoUser.username}`,
        graphql: 'updateTask'
      },
      event: result
    })

    history.push('/tasks')
  }


  if(!system) {
    return (
      <React.Fragment>
        <div>
          Loading...
        </div>
      </React.Fragment>
    )
  } else {
    const defaultValues = {
      systemID: system.id,
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
                    {
                      // <AvField onChange={(event, value) => setChosenSystem(value)} type="select" name="systemID" label="System" validate={{required: {value: true}}}>
                      //   {
                      //     systems.map((system, i) => {
                      //       return <option onSelectvalue={system._id} value={system._id}>{system.name}</option>
                      //     })
                      //   }
                      // </AvField>
                    }
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
                    {
                      // <AvField type='select' name='email' label='Assignee E-mail(Optional)'>
                      //   {
                      //     chosenSystem && systems.find(system => system._id == chosenSystem).users.map(user => {
                      //       return <option value={user._user.email}>{user._user.email}</option>
                      //     })
                      //   }
                      // </AvField>
                    }
                    <AvField type='select' name='assetID' label='Asset for Task' validate={{required: {value: true}}}>
                      {
                        system.assets && system.assets.items.map(asset => {
                          return <option value={asset.id}>{asset.name}</option>
                        })
                      }
                    </AvField>
                    <AvField type="select" name="stat" label="Status" validate={{required: {value: true}}}>
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
