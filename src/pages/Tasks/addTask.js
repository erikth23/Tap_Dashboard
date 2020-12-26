import React, {useEffect, useState} from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import {
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
  let user = JSON.parse(localStorage.getItem("authUser"));
  const {systems, error: errorSystem, isLoading: isLoadingSystem} = useSystems(user.email);
  const {tasks, error: errorTasks, isLoading: isLoadingTasks} = useTasks(chosenSystem);

  // useEffect(() => {
  //   if (systems) {
  //     //setChosenSystem(systems[0]._id);
  //   }
  // }, [systems])

  const handleSubmit = (event, error, values) => {
    // axios.post(process.env.REACT_APP_APIURL_DEV + '/systems/addUser', {
    //   systemID: values.systemID,
    //   owner: user.email,
    //   userEmail: values.email,
    //   role: values.role
    // }).then(res => console.log(res))
    // .catch(error => console.log(error))
  }

  if(isLoadingSystem || isLoadingTasks) {
    return (<React.Fragment>
      <Spinner className="mr-2" color="primary" />
    </React.Fragment>)
  } else {
    const defaultValues = {
      systemID: systems[0]._id,
      title: '',
      shortDescription: '',
      status: NOT_TAKEN,
      email: '',
      room: ''
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
                    <AvField type="select" name="systemID" label="System">
                      {
                        systems.map((system, i) => {
                          return <option onSelect={setChosenSystem(system._id)} onSelectvalue={system._id}>{system.name}</option>
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
                  </AvForm>
                  <AvField type="select" name="status" label="Status">
                    <option value={NOT_TAKEN}>{NOT_TAKEN}</option>
                    <option value={STUCK}>{STUCK}</option>
                    <option value={IN_PROGRESS}>{IN_PROGRESS}</option>
                    <option value={COMPLETED}>{COMPLETED}</option>
                  </AvField>
                  <AvField type='select' name='email' label='Assignee E-mail(Optional)'>
                    {
                      chosenSystem && systems.find(system => system._id == chosenSystem).users.map(user => {
                        return <option value={user._user.email}>{user._user.email}</option>
                      })
                    }
                  </AvField>
                  <AvField type='select' name='email' label='Assignee E-mail(Optional)'>
                    {
                      chosenSystem && systems.find(system => system._id == chosenSystem).rooms.map(room => {
                        return <option value={room._id}>{room._id}</option>
                      })
                    }
                  </AvField>
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
