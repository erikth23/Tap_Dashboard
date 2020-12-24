import React, {useState, useEffect} from 'react';
import {Spinner} from 'reactstrap';

import {useRooms} from '../../helpers/hooks';

const Rooms = (props) => {

  const statusToClass = new Map([
    [
      'ready', 'btn-outline-success'
    ],
    [
      'occupied', 'btn-outline-dark'
    ],
    [
      'clean', 'btn-outline-warning'
    ],
    [
      'dirty', 'btn-outline-danger'
    ]
  ])

  return (<React.Fragment>
    <div className="m-3">

    </div>
  </React.Fragment>)

}
// {
//   props.rooms && props.rooms.map((room, key) => <button className={`btn-lg btn-room ${statusToClass.get(room.status)}`}>
//     {room._id}
//   </button>)
// }

export default Rooms;
