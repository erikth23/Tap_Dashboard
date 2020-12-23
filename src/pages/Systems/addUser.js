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

const AddUser = (props) => {

  let user = JSON.parse(localStorage.getItem("authUser"));
  const {systems, error, isLoading} = useSystems(user.email);

  if (isLoading) {
    return (<React.Fragment>
      <Spinner className="mr-2" color="primary"/>
    </React.Fragment>)
  } else {
    const defaultValues = {
      systemID: systems[0].systemID,
      email: 'ex@gmail.com',
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
                  <AvForm model={defaultValues}>
                    <AvField type="select" name="systemID" label="Option">
                      {
                        systems.map((system, i) => {
                          return <option value={system.systemID}>{system.name}</option>
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
                    <FormGroup>
                      <label className="col-form-label">Role</label>
                      <div className='col-md-12'>
                        <select className='form-control'>
                          <option value="ADMINISTRATOR">ADMINISTRATOR</option>
                          <option value="USER">USER</option>
                        </select>
                      </div>
                    </FormGroup>
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
