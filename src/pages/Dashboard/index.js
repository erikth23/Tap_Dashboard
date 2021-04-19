import axios from 'axios'
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
import { getUser, getSystem } from '../../graphql/queries';
import { onUpdateSystem } from '../../graphql/subscriptions';
import { useTranslation } from 'react-i18next';

// Pages Components
import WelcomeComp from "./WelcomeComp";
import Rooms from "./Rooms";
import TaskTable from "./TaskTable";
import CleaningTime from "./CleaningTime";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';


const GET_CLEANING_TIME_API = "https://271kt734c3.execute-api.us-east-1.amazonaws.com/dev/GetCleaningTime"

const Dashboard = (props) => {

  const [system, setSystem] = useState({});
  const [cognitoUser, setCognitoUser] = useState();
  const [user, setUser] = useState({});
  const [subscriptions, setSubscriptions] = useState([]);
  const [cleaningTimes, setCleaningTimes] = useState([]);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    Auth.currentSession().then(data => {
      changeLanguage(data.idToken.payload["locale"] == "Spanish" ? "sp" : "en")
      setCognitoUser({
        username: data.idToken.payload["cognito:username"],
        systemID: data.idToken.payload["custom:systemID"]
      })
    })
  }, [])

  useEffect(() => {
    if(cognitoUser) {
        getDBUser()
        getDBSystem();
        getCleaningTimes();
        setSubscriptions();
        return clearSubscriptions();
    }
  }, [cognitoUser])

  const getDBUser = async () => {
    await API.graphql({query: getUser, variables: {id: `${cognitoUser.systemID}-${cognitoUser.username}`}})
    .then(res => setUser(res.data.getUser))
    .catch(err => console.log(err));
  }

  const getDBSystem = async () => {
    await API.graphql({query: getSystem, variables: {id: cognitoUser.systemID}})
    .then(res => setSystem(res.data.getSystem))
    .catch(err => console.log(err));
  }

  const setupSubscriptions = async () => {
    const systemSub = await API.graphql({query: onUpdateSystem, variables: {id: cognitoUser.systemID}})
    .subscribe({
      next: event => {
        if(event) {
          const newSystem = event.value.data.onUpdateSystem;
          if(!newSystem) {
            return;
          }
          setSystem(newSystem)
        }
      },
      error: error => console.error(error)
    })

    setSubscriptions([...subscriptions, systemSub])
  }

  const clearSubscriptions = () => {
    subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    setSubscriptions([]);
  }

  const getCleaningTimes = async () => {
    await axios.post(GET_CLEANING_TIME_API, {systemID: "5ff293a58d7a680e908fb02a"}).then(res => {
      setCleaningTimes(res.data)
    }).catch(err => {
      console.error(err)
    })
  }

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
            <Col xl="4">
              <WelcomeComp user={user}/>
            </Col>
            <Col xl="8">
              <CleaningTime times={cleaningTimes}/>
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

export default Dashboard;
