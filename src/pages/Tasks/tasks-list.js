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
import {API, graphqlOperation, Auth} from 'aws-amplify';
import { getUser, listTasks } from '../../graphql/queries.js';


import TaskView from './taskView';

import './tasks.scss';

const NOT_TAKEN = "NOTTAKEN";
const IN_PROGRESS = "INPROGRESS";
const COMPLETED = "COMPLETED";
const STUCK = "STUCK";

const TasksList = (props) => {

  const [email, setEmail] = useState();
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [viewTask, setViewTask] = useState();
  var today = new Date();
  today.setHours(0, 0, 0, 0);

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
      getTasks();
    }
  }, [user])

  const getDBUser = async () => {
    await API.graphql({query: getUser, variables: {id: email}})
    .then(res => setUser(res.data.getUser))
    .catch(err => console.log(err));
  }

  const getTasks = async () => {
    const filter = {
      systemID: {
        eq: user.systemID
      }
    }
    await API.graphql({query: listTasks, variables: { filter: filter}})
    .then(res => setTasks(res.data.listTasks.items))
    .catch(err => console.log(err))
  }

  return (<React.Fragment>
      <div className="page-content">
        <Container fluid="fluid">
          <Breadcrumbs title="Tasks" breadcrumbItem="Task List"/> {/* Render Breadcrumbs */}
          <Row>
            {
              // <Col className='mb-4' sm={6}>
              //   <Dropdown isOpen={systemDropIsOpen} toggle={() => setSystemDropIsOpen(!systemDropIsOpen)}>
              //     <DropdownToggle className="btn btn-secondary" caret="caret">
              //       {chosenSystem.name}{" "}
              //       <i className="mdi mdi-chevron-down"></i>
              //     </DropdownToggle>
              //     <DropdownMenu>
              //       {
              //         systems && systems.map(system => {
              //           return (<DropdownItem onClick={() => {
              //             setViewTask();
              //             setChosenSystem(system)
              //           }}>{system.name}</DropdownItem>)
              //         })
              //       }
              //     </DropdownMenu>
              //   </Dropdown>
              // </Col>
            }
            <Col className='mb-4' sm={2}>
              <div className="float-sm-left">
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
              {viewTask && <TaskView task={viewTask} system={user.systemID}/>}
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>);
  }

export default TasksList;
