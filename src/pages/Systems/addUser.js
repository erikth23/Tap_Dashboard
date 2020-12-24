import axios from 'axios';
import React, {useEffect} from 'react';
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
} from "reactstrap";
import {withNamespaces} from 'react-i18next';
import { AvForm, AvField } from "availity-reactstrap-validation";

import {useSystems} from '../../helpers/hooks';

const ADMINISTRATOR = 'ADMINISTRATOR';
const USER = 'USER';
const OWNER = 'OWNER';

const AddUser = (props) => {

  let user = JSON.parse(localStorage.getItem("authUser"));
  const {systems, error, isLoading} = useSystems(user.email);

  const handleSubmit = (event, error, values) => {
    axios.post(process.env.REACT_APP_APIURL_DEV + '/systems/addUser', {
      systemID: values.systemID,
      owner: user.email,
      userEmail: values.email,
      role: values.role
    }).then(res => console.log(res))
    .catch(error => console.log(error))
  }

  if (isLoading) {
    return (<React.Fragment>
      <Spinner className="mr-2" color="primary"/>
    </React.Fragment>)
  } else {
    const defaultValues = {
      systemID: systems[0]._id,
      email: '',
      role: 'USER'
    };
    return (<React.Fragment>
      <div className="page-content">
        <Container fluid="fluid">
          <Breadcrumbs title={props.t('System')} breadcrumbItem={props.t('Add User')}/>
          <Row>
            <Col>
              <Card>
                <CardTitle className='mt-4 ml-4'>Add User</CardTitle>
                <CardBody>
                  <AvForm onSubmit={handleSubmit} model={defaultValues}>
                    <AvField type="select" name="systemID" label="System">
                      {
                        systems.map((system, i) => {
                          return <option value={system._id}>{system.name}</option>
                        })
                      }
                    </AvField>
                    <AvField
                      name="email"
                      label="E-Mail  "
                      placeholder="Enter Valid Email"
                      type="email"
                      errorMessage="Invalid Email"
                      validate={{
                        required: { value: true },
                        email: { value: true }
                      }}
                    />
                    <AvField type="select" name="role" label="Role">
                      <option value={ADMINISTRATOR}>{ADMINISTRATOR}</option>
                      <option value={USER}>{USER}</option>
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

export default withNamespaces()(AddUser);
