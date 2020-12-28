import React, {useState, useEffect} from 'react';
import {Spinner} from 'reactstrap';

import {useRooms} from '../../helpers/hooks';

const Rooms = (props) => {

  const statusToClass = new Map([
    [
      'READY', 'btn-success'
    ],
    [
      'OCCUPIED', 'btn-dark'
    ],
    [
      'CLEAN', 'btn-warning'
    ],
    [
      'DIRTY', 'btn-danger'
    ]
  ])

  return (<React.Fragment>
    <div className="m-3">
      {
        props.rooms && props.rooms.map((room, key) => <button className={`btn-lg btn-room ${statusToClass.get(room.status)}`}>
          {room.name}
        </button>)
      }
    </div>
  </React.Fragment>)

}

export default Rooms;
