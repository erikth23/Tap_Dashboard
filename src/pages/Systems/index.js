import React, {useEffect, useState} from 'react';
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
  Spinner,
  Table
} from 'reactstrap';
import {Link} from 'react-router-dom';
import Breadcrumbs from '../../components/Common/Breadcrumb';

import {withNamespaces} from 'react-i18next';

import {useSystems} from '../../helpers/hooks.js';
import UserDropdown from './userDropdown';

const Systems = (props) => {

  const [systemDropIsOpen, setSystemDropIsOpen] = useState(false);
  const [chosenSystem, setChosenSystem] = useState({});
  let user = JSON.parse(localStorage.getItem("authUser"));
  const {systems, error, isLoading} = useSystems(user.email);

  useEffect(() => {
    if (systems && !chosenSystem.name) {
      setChosenSystem({name: systems[0].name, id: systems[0].systemID});
    }
  }, [systems])

  if (isLoading) {
    return (<React.Fragment>
      <Spinner className="mr-2" color="primary"/>
    </React.Fragment>)
  } else {
    return (<React.Fragment>
      <div className="page-content">
        <Container fluid="fluid">
          <Breadcrumbs title={props.t('Systems')} breadcrumbItem={props.t('Systems')}/>
          <Row>
            <Col className='mb-4' sm={6}>
              <Dropdown isOpen={systemDropIsOpen} toggle={() => setSystemDropIsOpen(!systemDropIsOpen)}>
                <DropdownToggle className="btn btn-secondary" caret="caret">
                  {chosenSystem.name}{" "}
                  <i className="mdi mdi-chevron-down"></i>
                </DropdownToggle>
                <DropdownMenu>
                  {
                    systems && systems.map(system => {
                      return (<DropdownItem onClick={() => setChosenSystem({name: system.name, id: system.systemID})}>{system.name}</DropdownItem>)
                    })
                  }
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <CardTitle className='mb-4 float-sm-left'>
                    Users
                  </CardTitle>
                  <div className="float-sm-right">
                    <Link to='/systems-addUser'><i className='pt-0 mdi mdi-account-plus w-100' style={{fontSize: 25}}></i></Link>
                  </div>
                  <div className="table-responsive">
                    <Table className="table-dentered table-nowrap table-hover">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          chosenSystem.id && systems.find(system => system.systemID == chosenSystem.id).users.map(user => {
                            return (<tr>
                              <td>{user._user.firstName + ' ' + user._user.lastName}</td>
                              <td>{user._user.email}</td>
                              <td><UserDropdown systemID={chosenSystem.id} user={user}/></td>
                            </tr>)
                          })
                        }
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>);
  }
}

export default withNamespaces()(Systems);
