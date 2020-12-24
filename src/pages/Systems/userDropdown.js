import axios from 'axios';
import React, {useState} from 'react';
import {Dropdown, DropdownToggle, DropdownItem, DropdownMenu} from 'reactstrap';

const ADMINISTRATOR = 'ADMINISTRATOR';
const USER = 'USER';
const OWNER = 'OWNER';

const UserDropdown = (props) => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [role, setRole] = useState(props.user.role);
  let user = JSON.parse(localStorage.getItem("authUser"));

  const changeRole = async (role) => {
    setRole(role);
    let request = {
      systemID: props.systemID,
      owner: user.email,
      userID: props.user._user._id,
      newRole: role
    }
    const result = await axios.post(process.env.REACT_APP_APIURL_DEV + '/systems/changeUserRole', request).catch(error => {
      return error;
    })
    if(!result.status) {
      setRole(props.user.role);
    }
  }

  return (<Dropdown isOpen={isDropOpen} toggle={() => setIsDropOpen(!isDropOpen)}>
    <DropdownToggle className="btn btn-primary">
      {role}
      <i className="mdi mdi-chevron-down"/>
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem onClick={() => changeRole(ADMINISTRATOR)}>{ADMINISTRATOR}</DropdownItem>
      <DropdownItem onClick={() => changeRole(USER)}>{USER}</DropdownItem>
    </DropdownMenu>
  </Dropdown>)
}

export default UserDropdown;
