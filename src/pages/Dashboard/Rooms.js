import React, {useState, useEffect} from 'react';

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
  const {rooms, isError, isLoading} = useRooms('uCC71TCZddvWGXWxtXK9E');

  if (isLoading) {
    return (<React.Fragment>
      <div>Loading Data</div>
    </React.Fragment>)
  } else {
    return (<React.Fragment>
      <div className="m-3">
        {
          rooms.map((room, key) => <button className={`btn-lg btn-room ${statusToClass.get(room.status)}`}>
            {room._id}
          </button>)
        }
      </div>
    </React.Fragment>)
  }

}

export default Rooms;
