import React, {useEffect, useState} from 'react';
import {Badge, Card, CardBody, CardTitle, Spinner} from 'reactstrap';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import { listTasks} from '../../graphql/queries.js';
import { onCreateTask, onUpdateTaskSystem, onDeleteTask } from '../../graphql/subscriptions';

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
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    console.log(systemID)
    if(systemID) {
      getTasks();
    }
  }, [systemID])

  useEffect(() => {
    setupSubscriptions();
    return clearSubscriptions();
  }, [tasks])

  const getTasks = async () => {
    const filter = {
      systemID: {
        eq: systemID
      }
    }
    await API.graphql({query: listTasks, variables: {filter: filter}})
    .then(res => setTasks(res.data.listTasks.items))
    .catch(err => console.error(err))
  }

  const setupSubscriptions = async () => {
    const createSub = await API.graphql({query: onCreateTask, variables: { "systemID": systemID}})
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

    console.log(systemID);
    const updateSub = await API.graphql({query: onUpdateTaskSystem, variables: { "systemID": systemID}})
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

    const deleteSub = await API.graphql({query: onDeleteTask, variables: { "systemID": systemID}})
    .subscribe({
      next: event => {
        const newTask = event.value.data.onDeleteTask;
        if(!newTask) {
          return;
        }
        const newTasks = tasks.filter(task => task.id != newTask.id )
        setTasks([...newTasks]);
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
                      <td>{task.title}</td>
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
