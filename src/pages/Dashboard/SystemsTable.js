import React, {useState, useEffect} from 'react';
import {Card, CardBody, CardTitle, Spinner} from 'reactstrap'

import {useSystems} from '../../helpers/hooks';

const SystemTable = (props) => {

  let user = JSON.parse(localStorage.getItem("authUser"));
  const {systems, error, isLoading} = useSystems(user.email);

  if (isLoading) {
    return (<React.Fragment>
      <Spinner className="mr-2" color="primary" />
    </React.Fragment>)
  } else {
    return (<React.Fragment>
      <Card>
        <CardTitle className="m-4">
          Systems
        </CardTitle>
        <CardBody>
          <div className="table-responsive">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Owner</th>
                  <th># of Rooms</th>
                  <th># of Sensors</th>
                  <th>Tasks</th>
                </tr>
              </thead>
              <tbody>
                {
                  systems && systems.map((system, key) => <tr>
                    <td>{system.name}</td>
                    <td>{system.adminEmail}</td>
                    <td>{system.rooms.length}</td>
                    <td>{system.sensors.length}</td>
                    <td>{system.tasks.filter(task => task.status != "COMPLETED").length}</td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>)
  }
}

export default SystemTable;
