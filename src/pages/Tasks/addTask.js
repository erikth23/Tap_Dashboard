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
import {withNamespaces} from 'react-i18next';
import { AvForm, AvField } from "availity-reactstrap-validation";
import {API, Auth} from 'aws-amplify';
import { getUser, getSystem } from '../../graphql/queries.js';
import { createTask } from '../../graphql/mutations.js';

import {useSystems, useTasks} from '../../helpers/hooks';

const NOT_TAKEN = "NOTTAKEN";
const IN_PROGRESS = "INPROGRESS";
const COMPLETED = "COMPLETED";
const STUCK = "STUCK";

const AddTask = (props) => {

  const [success, setSuccess] = useState(false);
  const [system, setSystem] = useState({});
  const [email, setEmail] = useState();
  const [user, setUser] = useState({});

  useEffect(() => {
    Auth.currentSession().then(data => setEmail(data.idToken.payload.email))
  })

  useEffect(() => {
    if(email) {
        getDBUser()
    }
  }, [email])

  useEffect(() => {
    if(user.systemID) {
      getDBSystem();
    }
  }, [user])

  const getDBUser = async () => {
    await API.graphql({query: getUser, variables: {id: email}})
    .then(res => setUser(res.data.getUser))
    .catch(err => console.log(err));
  }

  const getDBSystem = async () => {
    await API.graphql({query: getSystem, variables: {id: user.systemID}})
    .then(res => setSystem(res.data.getSystem))
    .catch(err => console.log(err));
  }

  const handleSubmit = async (event, error, values) => {
    console.log(values);

    const input = {
      systemID: system.id,
      title: values.title,
      shortDescription: values.shortDescription,
      status: values.stat,
      assetID: values.assetID
    }

    await API.graphql({query: createTask, variables: {input: input}})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }


    const defaultValues = {
      systemID: system.id,
      title: '',
      shortDescription: '',
      status: NOT_TAKEN,
      email: email,
      assetID: ''
    }
    return (<React.Fragment>
      <div className="page-content">
        <Container fluid="fluid">
          <Breadcrumbs title={props.t('Tasks')} breadcrumbItem={props.t('Add Task')}/>
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
                    <AvField type='select' name='assetID' label='Asset for Task(Optional)'>
                      {
                        system.assets && system.assets.items.map(asset => {
                          return <option value={asset.id}>{asset.name}</option>
                        })
                      }
                    </AvField>
                    <AvField type="select" name="stat" label="Status" validate={{required: {value: true}}}>
                      <option value={NOT_TAKEN}>{NOT_TAKEN}</option>
                      <option value={STUCK}>{STUCK}</option>
                      <option value={IN_PROGRESS}>{IN_PROGRESS}</option>
                      <option value={COMPLETED}>{COMPLETED}</option>
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

export default withNamespaces()(AddTask);
