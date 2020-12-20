import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ButtonDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table
} from "reactstrap";
import {Link} from "react-router-dom";

//import Charts
import StackedColumnChart from "./StackedColumnChart";

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import SocialSource from "./SocialSource";
import ActivityComp from "./ActivityComp";
import TopCities from "./TopCities";
import LatestTranaction from "./LatestTranaction";
import Rooms from "./Rooms";
import SystemsTable from "./SystemsTable";
import TaskTable from "./TaskTable";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//i18n
import {withNamespaces} from 'react-i18next';

import {useSystems} from '../../helpers/hooks.js';

const Dashboard = (props) => {

  const [modal, setmodal] = useState(false);
  const [systemDropIsOpen, setSystemDropIsOpen] = useState(false);
  const [system, setSystem] = useState({});
  let user = JSON.parse(localStorage.getItem("authUser"));
  const {systems, error, isLoading} = useSystems(user.email);

  if (isLoading) {
    return (<React.Fragment>
      <div>Loading Data</div>
    </React.Fragment>)
  } else {
    return (<React.Fragment>
      <div className="page-content">
        <Container fluid="fluid">

          {/* Render Breadcrumb */}
          <Breadcrumbs title={props.t('Dashboard')} breadcrumbItem={props.t('Dashboard')}/>
          <Row>
            <Col className='mb-4' sm={6}>
              <Dropdown isOpen={systemDropIsOpen} toggle={() => setSystemDropIsOpen(!systemDropIsOpen)}>
                <DropdownToggle className="btn btn-secondary" caret>
                  {system.name ? system.name : 'System'}{" "}
                  <i className="mdi mdi-chevron-down"></i>
                </DropdownToggle>
                <DropdownMenu>
                  {systems && systems.map(system => {
                    return(<DropdownItem onClick={() => setSystem({name: system.name, systemID: system.systemID})}>{system.name}</DropdownItem>)
                  })}
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4 float-sm-left">
                    Rooms
                  </CardTitle>
                  <div className="float-sm-right">
                    <div className="btn-group btn-group-md">
                      <button className="btn btn-dark">Occupied</button>
                      <button className="btn btn-success">Ready</button>
                      <button className="btn btn-danger">Dirty</button>
                      <button className="btn btn-warning">clean</button>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <Rooms/>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl="4">
              <WelcomeComp/>
            </Col>
            <Col xl="8">
              <SystemsTable/>
            </Col>
          </Row>

          <Row>
            <Col xl="4">
              <ActivityComp/>
            </Col>
            <Col xl="8">
              <Card>
                <CardTitle className="m-4">
                  Cleaning Time
                </CardTitle>
                <CardBody>
                  <StackedColumnChart/>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              <TaskTable systems={systems} systemID={system.systemID}/>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>);
  }
}

export default withNamespaces()(Dashboard);
