import React, {useState, useEffect} from 'react';
import {Spinner} from 'reactstrap';
import { DataStore } from 'aws-amplify';

import {Asset} from '../../models'

const ROOM = 'ROOM'
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

const Rooms = ({systemID, roomChosen, setRoomChosen}) => {

  const [assets, setAssets] = useState([]);

  useEffect(() => {
    getAssets()

    const subscription = DataStore.observe(Asset).subscribe(() => {
      getAssets()
    })

    return () => {subscription.unsubscribe()}
  }, [systemID])

  const getAssets = async () => {
    try {
      const _assets = await DataStore.query(Asset, c => c.systemID('eq', systemID).assetType('eq', ROOM))
      setAssets(_assets);
    } catch (err) {
      console.error(err)
    }
  }


  return (<React.Fragment>
    <div className="m-3">
      {
        assets.sort((a, b) => parseInt(a.name) - parseInt(b.name)).map((room, key) => <button className={`btn-lg btn-room ${statusToClass.get(room.status)}`}
        onClick={() => setRoomChosen(room.name == roomChosen ? '' : room.name)}>
          {room.name}
        </button>)
      }
    </div>
  </React.Fragment>)

}

export default Rooms;
