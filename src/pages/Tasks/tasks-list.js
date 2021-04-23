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

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import {Auth, DataStore, SortDirection} from 'aws-amplify';
import {Task} from '../../models';

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
    if(cognitoUser && cognitoUser.systemID) {
      getTasks();

      const subscription = DataStore.observe(Task).subscribe(() => {
        getTasks()
      })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [cognitoUser])

  const getTasks = async () => {
    try {
      const _tasks = await DataStore.query(Task, c => c.systemID('eq', cognitoUser.systemID))
      setTasks(_tasks)
    } catch (err) {
      console.error(err)
    }
  }

  const runUpdateTask = async (task) => {
    let result = null;

    try {
      await DataStore.save(
        Task.copyOf(viewTask, updated => {
          updated.status = task.status;
          updated.userID = task.userID;
        })
      )
      result = task;
    } catch (err) {
      console.error(err);
      result = err;
    }

    axios.post(LOGEVENT_API, {
      meta: {
        systemID: cognitoUser.systemID,
        userID: `${cognitoUser.systemID}-${cognitoUser.username}`,
        graphql: 'updateTask'
      },
      event: result
    })
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
                              console.log(task)
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
              {viewTask && <TaskView _task={viewTask} systemID={cognitoUser.systemID} setViewTask={setViewTask} runUpdateTask={runUpdateTask} username={cognitoUser.username}/>}
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>);
  }

export default TasksList;
