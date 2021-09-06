import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import {
  Button,
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardTitle,
  FormGroup
} from 'reactstrap';
import {BrowserRouter as Router, useHistory} from 'react-router-dom';
import { AvForm, AvField } from "availity-reactstrap-validation";
import {Auth, DataStore} from 'aws-amplify';

import {Guest, Asset} from '../../models';

const LOGEVENT_API = "https://ji7sxv0nt2.execute-api.us-east-1.amazonaws.com/default/LogEvent";

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

const Guests = (props) => {
  const [assets, setAssets] = useState([]);
  const [cognitoUser, setCognitoUser] = useState();
  const history = useHistory();

  useEffect(() => {
    Auth.currentSession().then(data => setCognitoUser({
      username: data.idToken.payload["cognito:username"],
      systemID: data.idToken.payload["custom:systemID"]
    }))
  }, [])

  useEffect(() => {
    if(cognitoUser && cognitoUser.systemID) {
        getAssets()
    }
  }, [cognitoUser])

  const getAssets = async () => {
    try {
      const _assets = await DataStore.query(Asset, c => c.systemID('eq', cognitoUser.systemID))
      setAssets(_assets)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (event, error, values) => {
    const input = {
      systemID: cognitoUser.systemID,
      number: values.number,
      firstName: values.firstName,
      lastName: values.lastName,
      status: values.stat,
      assetID: values.assetID,
    }

    console.log(input);

    let result = null;
    try {
      await DataStore.save(new Guest(input))
      result = input;
    } catch (err) {
      result = err;
      console.error(err)
    }

    await axios.post(LOGEVENT_API, {
      meta: {
        systemID: cognitoUser.systemID,
        userID: `${cognitoUser.systemID}-${cognitoUser.username}`,
        graphql: 'updateTask'
      },
      event: result
    })

    history.push('/guests')
  }

  if(!cognitoUser) {
    return (
      <React.Fragment>
        <div>
          Loading...
        </div>
      </React.Fragment>
    )
  } else {
    const defaultValues = {
      systemID: cognitoUser.systemID,
      number: '',
      firstName: '',
      lastName: '',
      stat: 'WAIT',
      assetID: ''
    }
    return (<React.Fragment>
      <div className="page-content">
        <Container fluid="fluid">
          <Breadcrumbs title={'Guests'} breadcrumbItem={'Add Guest'}/>
          <Row>
            <Col>
              <Card>
                <CardTitle className='mt-4 ml-4'>Add Task</CardTitle>
                <CardBody>
                  <AvForm onSubmit={handleSubmit} model={defaultValues}>
                    <AvField
                      name="firstName"
                      label="First Name"
                      placeholder="First Name"
                      type="text"
                    />
                    <AvField
                      name="lastName"
                      label="Last Name"
                      placeholder="Last Name"
                      type="text"
                    />
                    <AvField
                      name="number"
                      label="Phone Number"
                      placeholder="Phone Number of Guest"
                      type="text"
                      errorMessage="The Phone Number is Required"
                      validate={{
                        required: {value: true}
                      }}
                    />
                    <AvField type='select' name='assetID' label='Guest Room'>
                      {
                        assets.map(asset => {
                          return <option value={asset.id}>{asset.name}</option>
                        })
                      }
                    </AvField>
                    <AvField type="select" name="stat" label="Status">
                      {guestStatusArr.map(status => <option value={status.value}>{status.label}</option>)}
                    </AvField>
                    <FormGroup>
                      <div>
                        <Button type="submit" color="primary" className="mr-1">
                          Submit
                        </Button>{" "}
                        <Button type="reset" color="secondary">
                          Cancel
                        </Button>
                      </div>
                    </FormGroup>
                </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>)
  }
}

export default Guests
