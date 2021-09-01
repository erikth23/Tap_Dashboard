import React, {useState, useEffect} from 'react';
import {Spinner} from 'reactstrap';
import { DataStore } from 'aws-amplify';

import {Asset} from '../../models'
import {useCleaningTimes} from "../../helpers/hooks";

const ROOM = 'ROOM'
const statusToClass = new Map([
  [
    'READY', 'success'
  ],
  [
    'OCCUPIED', 'dark'
  ],
  [
    'CLEAN', 'warning'
  ],
  [
    'DIRTY', 'danger'
  ]
])

const ONE_HALF_DAY = 43200000;

const Rooms = ({systemID, roomChosen, setRoomChosen}) => {

  const {times, isError, isLoading} = useCleaningTimes(systemID)
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

  const isCleanedToday = (roomName) => {
    return times && times.find(time => {
      const start_time = new Date(time.startTime);

      return time.name == roomName &&
      Date.now() - start_time < ONE_HALF_DAY
    })
  }


  return (<React.Fragment>
    <div className="m-3">
      {
        assets.sort((a, b) => parseInt(a.name) - parseInt(b.name)).map((room, key) => <button className={`btn-lg btn-room ${isCleanedToday(room.name) ? 'btn-' : 'btn-outline-'}${statusToClass.get(room.status)}`}
        onClick={() => setRoomChosen(room.name == roomChosen ? '' : room.name)}>
          {room.name}
        </button>)
      }
    </div>
  </React.Fragment>)

}

export default Rooms;
