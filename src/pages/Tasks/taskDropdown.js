import React, {useState} from 'react';
import {Dropdown, DropdownToggle, DropdownItem, DropdownMenu} from 'reactstrap';

const TaskDropdown = (props) => {
  const [isDropOpen, setIsDropOpen] = useState(false);

  return (<Dropdown isOpen={isDropOpen} toggle={() => setIsDropOpen(!isDropOpen)}>
    <DropdownToggle className="btn btn-primary">
      {props.initial}
      <i className="mdi mdi-chevron-down"/>
    </DropdownToggle>
    <DropdownMenu>
      {
        props.items.map(item => {
          return <DropdownItem onClick={() => props.changeFunction(item)}>{item.label}</DropdownItem>
        })
      }
    </DropdownMenu>
  </Dropdown>)
}

export default TaskDropdown;
