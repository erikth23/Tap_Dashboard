import React, {useEffect, useState} from 'react';
import {Badge, Card, CardBody, CardTitle, Spinner} from 'reactstrap';
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
      const _tasks = await DataStore.query(Task, c => c.systemID('eq', systemID))
      setTasks(_tasks)
    } catch (err) {
      console.error(err)
    }
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
                  tasks && tasks.map((task) => {
                    return (<tr>
                      <td>{typeof task.title == "string" ? task.title : task.title[i18n.language]}</td>
                      <td>{'Not Found'}</td>
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
