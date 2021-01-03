import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ButtonDropdown,
  Button,
  Spinner
} from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

import ReactApexChart from 'react-apexcharts';

import {useSystems, useTasks} from '../../helpers/hooks';
import TaskView from './taskView';

import './tasks.scss';

const NOT_TAKEN = "NOT_TAKEN";
const IN_PROGRESS = "IN_PROGRESS";
const COMPLETED = "COMPLETED";
const STUCK = "STUCK";

const TasksList = (props) => {

  const [systemDropIsOpen, setSystemDropIsOpen] = useState(false);
  const [chosenSystem, setChosenSystem] = useState({_id: ''});
  const [viewTask, setViewTask] = useState();
  let user = JSON.parse(localStorage.getItem("authUser")).user;
  const {systems, error: errorSystem, isLoading: isLoadingSystem} = useSystems(user.email);
  const {tasks, error: errorTasks, isLoading: isLoadingTasks} = useTasks(chosenSystem._id);
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (systems && !chosenSystem.name) {
      setChosenSystem(systems[0]);
    }
  }, [systems])

  if (isLoadingSystem || isLoadingTasks) {
    return (<React.Fragment>
      <Spinner className="mr-2" color="primary"/>
    </React.Fragment>)
  } else {
    return (<React.Fragment>
      <div className="page-content">
        <Container fluid="fluid">
          <Breadcrumbs title="Tasks" breadcrumbItem="Task List"/> {/* Render Breadcrumbs */}
          <Row>
            <Col className='mb-4' sm={6}>
              <Dropdown isOpen={systemDropIsOpen} toggle={() => setSystemDropIsOpen(!systemDropIsOpen)}>
                <DropdownToggle className="btn btn-secondary" caret="caret">
                  {chosenSystem.name}{" "}
                  <i className="mdi mdi-chevron-down"></i>
                </DropdownToggle>
                <DropdownMenu>
                  {
                    systems && systems.map(system => {
                      return (<DropdownItem onClick={() => {
                        setViewTask();
                        setChosenSystem(system)
                      }}>{system.name}</DropdownItem>)
                    })
                  }
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col className='mb-4' sm={2}>
              <div className="float-sm-right">
                <Link to='/tasks-addTask'>
                  <i className='pt-0 mdi mdi-clipboard-plus-outline w-100' style={{
                      fontSize: 25
                    }}></i>
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xl={8}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Not Taken
                  </CardTitle>
                  <div className="table-responsive">
                    <table className="table table-nowrap table-centered mb-0">
                      <tbody>
                        {
                          tasks && tasks.filter(task => task.status == NOT_TAKEN).map(task => {
                            let date = new Date(task.createdAt);
                            return (<tr>
                              <td>
                                <h5 className="text-truncate font-size-14 m-0">
                                  <Button color="light" outline className="waves-effect" onClick={() => setViewTask(task)}>{task.title}</Button>
                                </h5>
                              </td>
                              <td>{task.owner && task.owner.firstName + ' ' + task.owner.lastName}</td>
                              <td>{date.toLocaleString()}</td>
                            </tr>)
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Stuck
                  </CardTitle>
                  <div className="table-responsive">
                    <table className="table table-nowrap table-centered mb-0">
                      <tbody>
                        {
                          tasks && tasks.filter(task => task.status == STUCK).map(task => {
                            let date = new Date(task.createdAt);
                            return (<tr>
                              <td>
                                <h5 className="text-truncate font-size-14 m-0">
                                  <Button color="light" outline className="waves-effect" onClick={() => setViewTask(task)}>{task.title}</Button>
                                </h5>
                              </td>
                              <td>{task.email}</td>
                              <td>{date.toLocaleString()}</td>
                            </tr>)
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4">In Progress
                  </CardTitle>
                  <div className="table-responsive">
                    <table className="table table-nowrap table-centered mb-0">
                      <tbody>
                        {
                          tasks && tasks.filter(task => task.status == IN_PROGRESS).map(task => {
                            let date = new Date(task.createdAt);
                            return (<tr>
                              <td>
                                <h5 className="text-truncate font-size-14 m-0">
                                  <Button color="light" outline className="waves-effect" onClick={() => setViewTask(task)}>{task.title}</Button>
                                </h5>
                              </td>
                              <td>{task.email}</td>
                              <td>{date.toLocaleString()}</td>
                            </tr>)
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Completed
                  </CardTitle>
                  <div className="table-responsive">
                    <table className="table table-nowrap table-centered mb-0">
                      <tbody>
                        {
                          tasks && tasks.filter(task => task.status == COMPLETED).filter(task => task.createdAt > today).map(task => {
                            let date = new Date(task.createdAt);
                            return (<tr>
                              <td>
                                <h5 className="text-truncate font-size-14 m-0">
                                  <Button color="light" outline className="waves-effect" onClick={() => setViewTask(task)}>{task.title}</Button>
                                </h5>
                              </td>
                              <td>{task.email}</td>
                              <td>{date.toLocaleString()}</td>
                            </tr>)
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-4" xl={4}>
              {viewTask && <TaskView task={viewTask} system={chosenSystem}/>}
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>);
  }
}

export default TasksList;
