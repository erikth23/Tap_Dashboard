import React, {useEffect, useState} from 'react';
import {Badge, Card, CardBody, CardTitle, Spinner} from 'reactstrap';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import { listTasks} from '../../graphql/queries.js';

const TaskTable = (props) => {

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
  const [awsTasks, setAwsTasks] = useState([]);

  useEffect(() => {
    if(props.systemID) {
      getAwsTasks();
    }
  }, [props.SystemID])

  const getAwsTasks = async () => {
    const filter = {
      systemID: {
        eq: props.systemID
      }
    }
    API.graphql({query: listTasks, variables: {filter: filter}})
    .then(res => setAwsTasks(res.data.listTasks.items))
    .catch(err => console.error(err))
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
                  awsTasks && awsTasks.map((task) => {
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
