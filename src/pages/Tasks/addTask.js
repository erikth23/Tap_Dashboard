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

import {useSystems, useTasks} from '../../helpers/hooks';

const NOT_TAKEN = "NOT_TAKEN";
const IN_PROGRESS = "IN_PROGRESS";
const COMPLETED = "COMPLETED";
const STUCK = "STUCK";

const AddTask = (props) => {

  const [chosenSystem, setChosenSystem] = useState();
  const [success, setSuccess] = useState(false);
  let user = JSON.parse(localStorage.getItem("authUser"));
  const {systems, error: errorSystem, isLoading: isLoadingSystem} = useSystems(user.email);

  useEffect(() => {
    if (systems) {
      setChosenSystem(systems[0]._id);
    }
  }, [systems])

  const handleSubmit = (event, error, values) => {
    axios.post(process.env.REACT_APP_APIURL + '/task/add', {
      systemID: values.systemID,
      title: values.title,
      shortDescription: values.shortDescription,
      status: values.taskStatus,
      email: values.email,
      room: values.room
    }).then(res => setSuccess(true))
    .catch(error => console.log(error))
    const timer = setTimeout(() => {
      setSuccess(false);
    }, 2000)
  }

  if(isLoadingSystem) {
    return (<React.Fragment>
      <Spinner className="mr-2" color="primary" />
    </React.Fragment>)
  } else {
    const defaultValues = {
      systemID: systems[0]._id,
      title: '',
      shortDescription: '',
      taskStatus: NOT_TAKEN,
      email: systems[0].users[0]._user.email,
      room: systems[0].rooms[0]._id
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
                    <AvField onChange={(event, value) => setChosenSystem(value)} type="select" name="systemID" label="System" validate={{required: {value: true}}}>
                      {
                        systems.map((system, i) => {
                          return <option onSelectvalue={system._id} value={system._id}>{system.name}</option>
                        })
                      }
                    </AvField>
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
                    <AvField type='select' name='email' label='Assignee E-mail(Optional)'>
                      {
                        chosenSystem && systems.find(system => system._id == chosenSystem).users.map(user => {
                          return <option value={user._user.email}>{user._user.email}</option>
                        })
                      }
                    </AvField>
                    <AvField type='select' name='room' label='Room for Task(Optional)'>
                      {
                        chosenSystem && systems.find(system => system._id == chosenSystem).rooms.map(room => {
                          return <option value={room._id}>{room.name}</option>
                        })
                      }
                    </AvField>
                    <AvField type="select" name="taskStatus" label="Status" validate={{required: {value: true}}}>
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
}

export default withNamespaces()(AddTask);
