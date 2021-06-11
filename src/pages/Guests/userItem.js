import React, {useState} from 'react';
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';
import {DataStore} from 'aws-amplify';

import {Guest} from '../../models';

const UserItem = ({guest, guestStatusArr, assets}) => {
  const [dropToggle, setDropToggle] = useState(false);

  const name = guest.firstName + ' ' + guest.lastName;
  if(name.length < 2) {
    name = "No Name"
  }

  const room = assets.find(asset => asset.id == guest.assetID);
  const roomName = room ? room.name : "";

  return(
    <tr>
      <td>
        <h5 className="text-truncate font-size-14 m-0">{name}</h5>
      </td>
      <td>{guest.number}</td>
      <td>{roomName}</td>
      <td>
        <Dropdown
          isOpen={dropToggle}
          toggle={() => setDropToggle(!dropToggle)}
          >
          <DropdownToggle className="btn btn-secondary" caret>
            {guest.status}
            <i className="mdi mdi-chevron-down"></i>
          </DropdownToggle>
          <DropdownMenu>
            {
              guestStatusArr.map((item, i) =>
                <DropdownItem key={i} onClick={() => {
                    DataStore.save(
                      Guest.copyOf(guest, updated => {
                        updated.status = item.value
                      })
                    )
                  }}>{item.value}</DropdownItem>
              )
            }
          </DropdownMenu>
        </Dropdown>
      </td>
    </tr>
  )
}

export default UserItem;
