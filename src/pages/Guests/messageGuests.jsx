import axios from 'axios'
import React, {useState, useEffect} from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import {
  Button,
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Spinner
} from 'reactstrap';
import {BrowserRouter as Router, useHistory} from 'react-router-dom';
import { AvForm, AvField } from "availity-reactstrap-validation";
import {API, Auth, DataStore} from 'aws-amplify';

import {Asset, Guest} from '../../models';

const ALL = 'ALL';
const MESSAGE_URL = "https://271kt734c3.execute-api.us-east-1.amazonaws.com/dev/Message-Guest";

const MessageGuests = (props) => {
  const [assets, setAssets] = useState([]);
  const [guests, setGuests] = useState([]);
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
        getGuests()
        getAssets()
    }
  }, [cognitoUser])

  const getGuests = async () => {
    try {
      var _guests = await DataStore.query(Guest, c => c.systemID('eq', cognitoUser.systemID))
      _guests.unshift({id: ALL})
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

  const handleSubmit = async (event, error, values) => {
    await axios.post(MESSAGE_URL, {
      guestID: values.guest,
      message: values.message
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
      guest: 'ALL',
      message: ''
    }
    return(
      <React.Fragment>
        <div className="page-content">
          <Container fluid="fluid">
            <Breadcrumbs title={'Guests'} breadcrumbItem="Message Guests"/>
            <Row>
              <Col>
                <Card>
                  <CardTitle className='mt-4 ml-4'>Message Guest</CardTitle>
                  <CardBody>
                    <AvForm onSubmit={handleSubmit} model={defaultValues}>
                      <AvField type='select' name='guest' label='Guest'>
                        {
                          guests.filter(guest => guest.status != 'DONE')
                          .map(guest => {
                            var assetName = guest.id == ALL ? ALL : assets.find(asset => asset.id == guest.assetID)
                            if(!assetName) {
                              assetName = guest.name
                            } else if(assetName != ALL) {
                              assetName = assetName.name
                            }
                            return <option value={guest.id}>{assetName}</option>
                          })
                        }
                      </AvField>
                      <AvField
                        name="message"
                        label="Message"
                        placeholder="Message the guest directly"
                        type="text"
                        errorMessage="The message is required"
                        validate={{
                          required: {value: true}
                        }}
                      />
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
      </React.Fragment>
    )
  }
}

export default MessageGuests;
