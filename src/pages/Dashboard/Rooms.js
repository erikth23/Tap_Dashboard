import React, {useState, useEffect} from 'react';
import { DataStore } from 'aws-amplify';

import Menu from '../../components/Menu';

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
const ONE_HOUR = 3600000;
const ONE_MIN = 60000;

const Rooms = ({systemID, roomChosen, setRoomChosen, setRoomPill}) => {

  const {times} = useCleaningTimes(systemID)
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
      const end_time = new Date(time.endTime);

      return time.name === roomName &&
      end_time - start_time > ONE_MIN &&
      end_time - start_time < ONE_HOUR &&
      Date.now() - start_time < ONE_HALF_DAY
    })
  }


  return (<React.Fragment>
    <Menu setRoomPill={setRoomPill}/>
    <div className="m-3">
      {
        assets.sort((a, b) => parseInt(a.name) - parseInt(b.name)).map((room, key) => <button className={`btn-lg btn-room ${isCleanedToday(room.name) ? 'btn-' : 'btn-outline-'}${statusToClass.get(room.status)}`}
        onClick={() => setRoomChosen(room.name === roomChosen ? '' : room.name)}
        value={`asset@${room.id}`}>
          {room.name}
        </button>)
      }
    </div>
  </React.Fragment>)

}

export default Rooms;
