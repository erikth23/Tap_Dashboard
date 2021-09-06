import React, {useState, useEffect} from 'react';
import {
  Badge,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import { Auth } from 'aws-amplify';
import { useTranslation } from 'react-i18next';

// Pages Components
import Rooms from "./Rooms";
import TaskTable from "./TaskTable";
import CleaningTime from "./CleaningTime";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';


const Dashboard = (props) => {

  const [cognitoUser, setCognitoUser] = useState();
  const [roomChosen, setRoomChosen] = useState('');
  const [roomPill, setRoomPill] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    Auth.currentSession().then(data => {
      changeLanguage(data.idToken.payload["locale"] === "Spanish" ? "sp" : "en")
      setCognitoUser({
        username: data.idToken.payload["cognito:username"],
        systemID: data.idToken.payload["custom:systemID"]
      })
    })
  }, [])

  useEffect(() => {
    if(roomPill) {
      setTimeout(() => {
        setRoomPill(false)
      }, 2500)
    }
  }, [roomPill])

  return (<React.Fragment>
      <div className="page-content">
        <Container fluid="fluid">

          {/* Render Breadcrumb */}
          <Breadcrumbs title={t('Dashboard')} breadcrumbItem={t('Dashboard')}/>
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
            {/*
              <Col xl="4">
                {
                  cognitoUser &&
                  <WelcomeComp user={cognitoUser.username}/>
                }
              </Col>
              */}
            <Col xl="12">
              {
                cognitoUser &&
                <CleaningTime systemID={cognitoUser.systemID} roomChosen={roomChosen}/>
              }
            </Col>
          </Row>
          <Row>
            <Col xl="12">
              <Card>
                <CardTitle className="mt-4 ml-4 float-sm-left">
                  Rooms
                  {roomPill && <Badge pill="pill" className="badge-soft-success mr-1 ml-3">Success</Badge>}
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
                       cognitoUser &&
                        <Rooms systemID={cognitoUser.systemID}
                          roomChosen={roomChosen}
                          setRoomChosen={setRoomChosen}
                          setRoomPill={setRoomPill}/>
                    }
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              { cognitoUser &&
                <TaskTable systemID={cognitoUser.systemID}/>
              }
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>);
  }

export default Dashboard;
