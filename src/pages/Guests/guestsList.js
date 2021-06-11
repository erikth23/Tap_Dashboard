import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ButtonDropdown,
  Button,
  Spinner,
  Table
} from "reactstrap";
import {BrowserRouter as Router, useHistory} from "react-router-dom";
import { useTranslation } from 'react-i18next';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import {Auth, DataStore, SortDirection} from 'aws-amplify';
import {Asset, Guest} from '../../models';
import UserItem from './userItem';

const guestStatusArr = [
  {
    value: 'WAIT',
    label: 'Waiting for Room'
  },
  {
    value: 'IN',
    label: 'In The Room'
  },
  {
    value: 'DONE',
    label: 'Checked Out'
  }]


const LOGEVENT_API = "https://ji7sxv0nt2.execute-api.us-east-1.amazonaws.com/default/LogEvent";

const GuestsList = (props) => {

  const [cognitoUser, setCognitoUser] = useState();
  const [guests, setGuests] = useState([]);
  const [assets, setAssets] = useState([]);
  const history = useHistory();
  const commaRegexp = /, (?=\w{2,3}=)/g

  useEffect(() => {
    Auth.currentSession().then(data => setCognitoUser({
      username: data.idToken.payload["cognito:username"],
      systemID: data.idToken.payload["custom:systemID"]
    }))
  }, [])

  useEffect(() => {
    if(cognitoUser && cognitoUser.systemID) {
      getGuests();
      getAssets();

      const subscription = DataStore.observe(Guest).subscribe(() => {
        getGuests()
      })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [cognitoUser])

  const getGuests = async () => {
    try {
      const _guests = await DataStore.query(Guest, c => c.systemID('eq', cognitoUser.systemID))
      console.log(_guests)
      setGuests(_guests)
    } catch (err) {
      console.error(err)
    }
  }

  const getAssets = async () => {
    try {
      const _assets = await DataStore.query(Asset, c => c.systemID('eq', cognitoUser.systemID))
      setAssets(_assets)
    } catch (err) {
      console.error(err)
    }
  }

  return (<React.Fragment>
      <div className="page-content">
        <Container fluid="fluid">
          <Breadcrumbs title="Tasks" breadcrumbItem="Task List"/> {/* Render Breadcrumbs */}
          <Row>
            <Col xl={12}>
              {guestStatusArr.map(status =>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">{status.label}</CardTitle>
                    <div className="table-responsive" style={{overflow: 'visible'}}>
                      <Table className="table-dentered table-nowrap table-hover">
                        <tbody>
                          {
                            guests && guests.filter(guest => guest.status == status.value).map(guest =>
                              <UserItem guest={guest} guestStatusArr={guestStatusArr} assets={assets}/>
                            )
                          }
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              )}
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>);
  }

export default GuestsList;
