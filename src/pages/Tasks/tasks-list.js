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
import { getUser, listTasks } from '../../graphql/queries';
import { updateTask } from '../../graphql/mutations';
import { onCreateTask, onUpdateTask, onDeleteTask } from '../../graphql/subscriptions';


import TaskView from './taskView';

import './tasks.scss';

const NOT_TAKEN = "NOTTAKEN";
const IN_PROGRESS = "INPROGRESS";
const COMPLETED = "COMPLETED";
const STUCK = "STUCK";
const statuses = [NOT_TAKEN, IN_PROGRESS, STUCK, COMPLETED];

const TasksList = (props) => {

  const [email, setEmail] = useState();
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [viewTask, setViewTask] = useState();
  const [subscriptions, setSubscriptions] = useState([]);
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

  useEffect(() => {
    if(tasks.length > 0 && subscriptions.length < 1) {
        setupSubscriptions();
        return clearSubscriptions();
    }
  }, [tasks])

  const getDBUser = async () => {
    await API.graphql({query: getUser, variables: {id: email}})
    .then(res => setUser(res.data.getUser))
    .catch(err => console.log(err));
  }

  const getTasks = async () => {
    const input = {
      systemID: {
        eq: user.systemID
      }
    }
    await API.graphql({query: listTasks, variables: { input: input}})
    .then(res => setTasks(res.data.listTasks.items))
    .catch(err => console.log(err))
  }

  const setupSubscriptions = async () => {
    const createSub = await API.graphql({query: onCreateTask, variables: { systemID: user.systemID}})
    .subscribe({
      next: event => {
        if(event) {
          const newTask = event.value.data.onCreateTask;
          if(!newTask) {
            return;
          }
          setTasks([...tasks, newTask])
        }
      },
      error: error => console.error(error)
    })

    const updateSub = await API.graphql({query: onUpdateTask, variables: { systemID: user.systemID}})
    .subscribe({
      next: event => {
        if(event) {
          const newTask = event.value.data.onUpdateTask;
          if(!newTask) {
            return;
          }

          tasks.forEach((item, i) => {
            if(item.id == newTask.id) {
              tasks[i] = newTask;
              setTasks([...tasks]);
              return;
            }
          });
        }
      },
      error: error => console.error(error)
    })

    const deleteSub = await API.graphql({query: onDeleteTask, variables: { systemID: user.systemID}})
    .subscribe({
      next: event => {
        const newTask = event.value.data.onDeleteTask;
        if(!newTask) {
          return;
        }
        const newTasks = tasks.filter(task => task.id != newTask.id )
        console.log(newTasks)
        setTasks(newTasks);
      },
      error: error => console.error(error)
    })

    setSubscriptions([...subscriptions, createSub, updateSub, deleteSub])
  }

  const clearSubscriptions = () => {
    subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    setSubscriptions([]);
  }

  const runUpdateTask = async (task) => {
    const update = {
      id: task.id,
      shortDescription: task.shortDescription,
      status: task.status,
      userID: task.userID
    }

    await API.graphql(graphqlOperation(updateTask, {input: update}))
    .then(res => {
      tasks.forEach((item, i) => {
        if(item.id == task.id) {
          tasks[i] = res.data.updateTask;
          console.log("Setting task value")
          setTasks([...tasks]);
          return;
        }
      });
    }).catch(err => {
      console.log(err);
    })
  }

  return (<React.Fragment>
      <div className="page-content">
        <Container fluid="fluid">
          <Breadcrumbs title="Tasks" breadcrumbItem="Task List"/> {/* Render Breadcrumbs */}
          <Row>
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
              {statuses.map(status =>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">{status}</CardTitle>
                    <div className="table-responsive">
                      <table className="table table-nowrap table-centered mb-0">
                        <tbody>
                          {
                            tasks && tasks.filter(task => task.status == status).map(task => {
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
              )}
            </Col>
            <Col className="mb-4" xl={4}>
              {viewTask && <TaskView _task={viewTask} system={user.systemID} setViewTask={setViewTask} runUpdateTask={runUpdateTask} user={user}/>}
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>);
  }

export default TasksList;
