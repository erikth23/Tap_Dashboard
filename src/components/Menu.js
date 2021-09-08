import React from 'react';
import { DataStore } from 'aws-amplify';

import {Asset} from '../models'
import {useContextMenu} from "../helpers/hooks";

const Menu = ({setRoomPill}) => {
  const { anchorPoint, show, assetID } = useContextMenu();

  if (show) {
    return (
      <ul className="context-menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
        <li className={'btn-sm btn-link'} onClick={async () => {
            // const asset = await DataStore.query(Asset, assetID);
            //
            // await DataStore.save(Asset.copyOf(asset, updated => {
            //   updated.accountStatus = "STAY"
            // }));
            setRoomPill(true)
          }}>Stay</li>
        <li className={'btn-sm btn-link'} onClick={async () => {
            // const asset = await DataStore.query(Asset, assetID);
            //
            // await DataStore.save(Asset.copyOf(asset, updated => {
            //   updated.accountStatus = "STAY_N"
            // }));
            setRoomPill(true)
          }}>Stay No Clean</li>
        <li className={'btn-sm btn-link'} onClick={async () => {
            // const asset = await DataStore.query(Asset, assetID);
            //
            // await DataStore.save(Asset.copyOf(asset, updated => {
            //   updated.accountStatus = "CO"
            // }));
            setRoomPill(true)
          }}>C/O</li>
        <li className={'btn-sm btn-link'} onClick={async () => {
            // const asset = await DataStore.query(Asset, assetID);
            //
            // await DataStore.save(Asset.copyOf(asset, updated => {
            //   updated.accountStatus = "CO_N"
            // }));
            setRoomPill(true)
          }}>C/O No Clean</li>
        <li className={'btn-sm btn-link'} onClick={async () => {
            const asset = await DataStore.query(Asset, assetID);

            await DataStore.save(Asset.copyOf(asset, updated => {
              updated.accountStatus = null
            }));
            setRoomPill(true)
          }}>Remove Status</li>
      </ul>
    );
  }
  return <></>;
};

export default Menu;
