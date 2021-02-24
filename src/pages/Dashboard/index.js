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
  Spinner,
  Table
} from "reactstrap";
import {Link} from "react-router-dom";
import {API, graphqlOperation, Auth} from 'aws-amplify';
import { getUser, getSystem } from '../../graphql/queries.js';

// Pages Components
import WelcomeComp from "./WelcomeComp";
import Rooms from "./Rooms";
import TaskTable from "./TaskTable";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//i18n
import {withNamespaces} from 'react-i18next';

const Dashboard = (props) => {

  const [system, setSystem] = useState({});
  const [email, setEmail] = useState();
  const [user, setUser] = useState({});

  useEffect(() => {
    Auth.currentSession().then(data => setEmail(data.idToken.payload.email))
  })

  useEffect(() => {
    if(email) {
        getDBUser()
    }
  }, [email])

  useEffect(() => {
    if(user.systemID) {
      getDBSystem();
    }
  }, [user])

  const getDBUser = async () => {
    await API.graphql({query: getUser, variables: {id: email}})
    .then(res => setUser(res.data.getUser))
    .catch(err => console.log(err));
  }

  const getDBSystem = async () => {
    await API.graphql({query: getSystem, variables: {id: user.systemID}})
    .then(res => setSystem(res.data.getSystem))
    .catch(err => console.log(err));
  }

  return (<React.Fragment>
      <div className="page-content">
        <Container fluid="fluid">

          {/* Render Breadcrumb */}
          <Breadcrumbs title={props.t('Dashboard')} breadcrumbItem={props.t('Dashboard')}/>
          {
            // <Row>
            //   <Col className='mb-4' sm={6}>
            //     <Dropdown isOpen={systemDropIsOpen} toggle={() => setSystemDropIsOpen(!systemDropIsOpen)}>
            //       <DropdownToggle className="btn btn-secondary" caret="caret">
            //         {chosenSystem.name}{" "}
            //         <i className="mdi mdi-chevron-down"></i>
            //       </DropdownToggle>
            //       <DropdownMenu>
            //         {
            //           systems && systems.map(system => {
            //             return (<DropdownItem onClick={() => setChosenSystem(system)}>{system.name}</DropdownItem>)
            //           })
            //         }
            //       </DropdownMenu>
            //     </Dropdown>
            //   </Col>
            // </Row>
          }
          <Row>
            <Col xl="4">
              <WelcomeComp/>
            </Col>
            <Col xl="8">
              {
                //<SystemsTable/>
              }
            </Col>
          </Row>
          <Row>
            <Col xl="12">
              <Card>
                <CardTitle className="mt-4 ml-4 float-sm-left">
                  Rooms
                  <div className="float-sm-right mr-4">
                    <div className="btn-group btn-group-md">
                      <button className="btn btn-dark">Occupied</button>
                      <button className="btn btn-success">Ready</button>
                      <button className="btn btn-danger">Dirty</button>
                      <button className="btn btn-warning">Clean</button>
                    </div>
                  </div>
                </CardTitle>
                <CardBody>
                  <div className="clearfix">
                    {
                       system.assets &&
                        <Rooms rooms={system.assets.items.filter(item => item.assetType == "ROOM")}/>
                    }
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              { system.id &&
                <TaskTable systemID={system.id}/>
              }
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>);
  }

export default withNamespaces()(Dashboard);
