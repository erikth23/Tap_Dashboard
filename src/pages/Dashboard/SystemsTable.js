import axios from 'axios'
import React, {useState, useEffect} from 'react';
import {Card, CardBody, CardTitle} from 'reactstrap'

const SystemTable = (props) => {

  return (
    <React.Fragment>
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
                  props.systems.map((system, key) =>
                    <tr>
                      <td>{system.name}</td>
                      <td>{system.adminEmail}</td>
                      <td>{system.rooms.length}</td>
                      <td>{system.sensors.length}</td>
                    </tr>)
                }
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default SystemTable;
