import React, {useState, useEffect} from 'react';
import { DataStore } from 'aws-amplify';

import Menu from '../../components/Menu';

import {Asset} from '../../models'
import {useCleaningTimes} from "../../helpers/hooks";

const ROOM = 'ROOM'
const statusToClass = new Map([
  [
    'OCCUPIED', 'dark'
  ],
  [
    'CLEAN', 'success'
  ],
  [
    'DIRTY', 'danger'
  ]
])

const STAY = "STAY";
const STAY_N = "STAY_N";

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

  const isStay = (acctStatus) => {
    return acctStatus === STAY || acctStatus === STAY_N
  }


  return (<React.Fragment>
    <Menu setRoomPill={setRoomPill}/>
    <div className="m-3">
      {
        assets.sort((a, b) => parseInt(a.name) - parseInt(b.name)).map((room, key) => <button className={`btn-lg btn-room ${isStay(room.accountStatus) ? 'btn-' : 'btn-outline-'}${statusToClass.get(room.status)}`}
        onClick={() => setRoomChosen(room.id === roomChosen ? '' : room.id)}
        value={`asset@${room.id}`}>
          {room.name}
        </button>)
      }
    </div>
  </React.Fragment>)

}

export default Rooms;
