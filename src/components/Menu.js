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
            const asset = await DataStore.query(Asset, assetID);

            await DataStore.save(Asset.copyOf(asset, updated => {
              updated.accountStatus = "STAY"
            }));
            setRoomPill(true)
          }}>Mark S/O</li>
      </ul>
    );
  }
  return <></>;
};

export default Menu;
