import React, {useEffect, useState} from 'react';
import {Badge, Card, CardBody, CardTitle} from 'reactstrap';
import {useTranslation} from 'react-i18next';
import {DataStore} from 'aws-amplify';
import {Task} from '../../models';

const statusToColor = new Map([
  [
    'COMPLETED', 'success'
  ],
  [
    'NOTTAKEN', 'dark'
  ],
  [
    'INPROGRESS', 'warning'
  ],
  [
    'STUCK', 'danger'
  ]
])

const TaskTable = ({systemID}) => {
  const [tasks, setTasks] = useState([]);
  const {i18n} = useTranslation()
  const commaRegexp = /, (?=\w{2,3}=)/g

  useEffect(() => {
    if(systemID) {
      getTasks();

      const subscription = DataStore.observe(Task).subscribe(() => {
        getTasks()
      })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [systemID])

  const getTasks = async () => {
    try {
      console.log('getting new tasks')
      const _tasks = await DataStore.query(Task, c => c.systemID('eq', systemID))
      setTasks(_tasks)
    } catch (err) {
      console.error(err)
    }
  }

  const getTimeDiff = (updatedAt) => {
    const today = new Date();
    const timestamp = new Date(updatedAt);
    const days = Math.round(Math.abs((timestamp - today)) / (24 * 60 * 60 * 1000));

    return days < 1;
  }

  return (<React.Fragment>
      <Card>
        <CardTitle className="m-4">
          Tasks
        </CardTitle>
        <CardBody>
          <div className="table-responsive">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Assigned To</th>
                  <th>Created At</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  tasks && tasks.filter(task => task.status !== "COMPLETED" || getTimeDiff(task.updatedAt)).map((task) => {
                    const _title = !task.title.includes('{') ? task.title : (task.title.includes('=') ? JSON.parse(task.title.replace("{", "{\"").replaceAll(commaRegexp, "\",\"").replaceAll("=", "\":\"").replace("}", "\"}"))[i18n.language] : JSON.parse(task.title)[i18n.language])
                    return (<tr>
                      <td>{_title}</td>
                      <td>{task.userID.split('-')[1] || 'nouser'}</td>
                      <td>{task.createdAt}</td>
                      <td><Badge color={statusToColor.get(task.status)}>{task.status}</Badge></td>
                    </tr>)
                  })
                }
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>)
  }

export default TaskTable;
