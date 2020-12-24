import React, {useEffect, useState} from 'react';
import {Badge, Card, CardBody, CardTitle, Spinner} from 'reactstrap';

import {useTasks} from '../../helpers/hooks';

const TaskTable = (props) => {

  const statusToColor = new Map([
    [
      'COMPLETED', 'success'
    ],
    [
      'NOT_TAKEN', 'dark'
    ],
    [
      'IN_PROGRESS', 'warning'
    ],
    [
      'STUCK', 'danger'
    ]
  ])
  const {tasks, isError, isLoading} = useTasks(props.systemID);

  if(isLoading) {
    return (<React.Fragment>
      <Spinner className="mr-2" color="primary" />
    </React.Fragment>)
  } else {
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
                  props.systemID && tasks.filter((task) => task.system == props.systemID).map((task) => {
                    return (<tr>
                      <td>{task.title}</td>
                      <td>{task.email}</td>
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
}

export default TaskTable;
