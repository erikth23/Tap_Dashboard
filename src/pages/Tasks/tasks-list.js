import axios from 'axios';
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
import {BrowserRouter as Router, useHistory} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import rjson from 'relaxed-json'

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import { getUser, listTasks } from '../../graphql/queries';
import { updateTask } from '../../graphql/mutations';
import { onCreateTask, onUpdateTaskSystem, onDeleteTask } from '../../graphql/subscriptions';

import TaskView from './taskView';

import './tasks.scss';

const NOT_TAKEN = "NOTTAKEN";
const IN_PROGRESS = "INPROGRESS";
const COMPLETED = "COMPLETED";
const STUCK = "STUCK";
const statuses = [NOT_TAKEN, IN_PROGRESS, STUCK, COMPLETED];

const LOGEVENT_API = "https://ji7sxv0nt2.execute-api.us-east-1.amazonaws.com/default/LogEvent";

const TasksList = (props) => {

  const [cognitoUser, setCognitoUser] = useState();
  const [tasks, setTasks] = useState([]);
  const [viewTask, setViewTask] = useState();
  const [subscriptions, setSubscriptions] = useState([]);
  const history = useHistory();
  const { t, i18n } = useTranslation();
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    Auth.currentSession().then(data => setCognitoUser({
      username: data.idToken.payload["cognito:username"],
      systemID: data.idToken.payload["custom:systemID"]
    }))
  }, [])

  useEffect(() => {
    if(cognitoUser) {
        getTasks()
    }
  }, [cognitoUser])

  useEffect(() => {
    if(tasks.length > 0 && subscriptions.length < 1) {
        setupSubscriptions();
        return clearSubscriptions();
    }
  }, [tasks])


  const getTasks = async () => {
    const filter = {
      systemID: {
        eq: cognitoUser.systemID
      }
    }
    await API.graphql({query: listTasks, variables: { filter: filter}})
    .then(res => setTasks(res.data.listTasks.items.map(item => {
      return item.title.includes("{") ? {
        ...item,
        title: JSON.parse(item.title.replace("{", "{\"").replaceAll(", ", "\",\"").replaceAll("=", "\":\"").replace("}", "\"}")),
        shortDescription: JSON.parse(item.shortDescription.replace("{", "{\"").replaceAll(", ", "\",\"").replaceAll("=", "\":\"").replace("}", "\"}")),
        comments: item.comments.items.map(comment => {
          return comment.comment.includes("{") ? {
            ...comment,
            comment: JSON.parse(comment.comment.replace("{", "{\"").replaceAll(", ", "\",\"").replaceAll("=", "\":\"").replace("}", "\"}"))
          } : comment
        })
      } : {
        ...item,
        comments: item.comments.items.map(comment => {
          const commaRegexp = /, (?=\w{2,3}=)/g
          return comment.comment.includes("{") ? {
            ...comment,
            comment: JSON.parse(comment.comment.replace("{", "{\"").replaceAll(commaRegexp, "\",\"").replaceAll("=", "\":\"").replace("}", "\"}")),
            createdAt: new Date(comment.createdAt)
          } : {...comment, createdAt: new Date(comment.createdAt)}
        })
      }
    })))
    .catch(err => console.log(err))
  }

  const setupSubscriptions = async () => {
    const createSub = await API.graphql({query: onCreateTask, variables: { systemID: cognitoUser.systemID}})
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

    const updateSub = await API.graphql({query: onUpdateTaskSystem, variables: { systemID: cognitoUser.systemID}})
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

    const deleteSub = await API.graphql({query: onDeleteTask, variables: { systemID: cognitoUser.systemID}})
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
      userID: task.userID,
      locale: i18n.language
    }

    let result = null;
    await API.graphql(graphqlOperation(updateTask, {input: update}))
    .then(res => {
      tasks.forEach((item, i) => {
        if(item.id == task.id) {
          tasks[i] = res.data.updateTask;
          setTasks([...tasks]);
          return;
        }
      });
      result = update;
    }).catch(err => {
      result = err;
      console.log(err);
    })

    await axios.post(LOGEVENT_API, {
      meta: {
        systemID: cognitoUser.systemID,
        userID: `${cognitoUser.systemID}-${cognitoUser.username}`,
        graphql: 'updateTask'
      },
      event: result
    })
    history.push('/tasks');
  }

  const getTimeDiff = (updatedAt) => {
  	const today = new Date();
  	const timestamp = new Date(updatedAt);
  	const days = Math.round(Math.abs((timestamp - today)) / (24 * 60 * 60 * 1000));

  	return days < 1;
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
                            tasks && tasks.filter(task => task.status == status && (status != "COMPLETED" || getTimeDiff(task.updatedAt))).map(task => {
                              let date = new Date(task.createdAt);
                              return (<tr>
                                <td>
                                  <h5 className="text-truncate font-size-14 m-0">
                                    <Button color="light" outline className="waves-effect" onClick={() => setViewTask(task)}>{typeof task.title == "string" ? task.title : task.title[i18n.language]}</Button>
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
              {viewTask && <TaskView _task={viewTask} system={cognitoUser.systemID} setViewTask={setViewTask} runUpdateTask={runUpdateTask} username={cognitoUser.username}/>}
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>);
  }

export default TasksList;
