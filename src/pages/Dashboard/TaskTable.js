import React, {useEffect, useState} from 'react';
import {Badge, Card, CardBody, CardTitle, Spinner} from 'reactstrap';
import {useTranslation} from 'react-i18next';
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
  const {i18n} = useTranslation()

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
      } : item
    })))
    .catch(err => console.log(err))
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
