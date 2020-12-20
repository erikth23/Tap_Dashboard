import React, {useState} from 'react';
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
  ButtonDropdown
} from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

import ReactApexChart from 'react-apexcharts';

import {useSystems} from '../../helpers/hooks';

const NOT_TAKEN = "NOT_TAKEN";
const IN_PROGRESS = "IN_PROGRESS";
const COMPLETED = "COMPLETED";
const STUCK = "STUCK";

const TasksList = (props) => {

  const [systemDropIsOpen, setSystemDropIsOpen] = useState(false);
  const [chosenSystem, setChosenSystem] = useState({});
  let user = JSON.parse(localStorage.getItem("authUser"));
  const {systems, error, isLoading} = useSystems(user.email);
  var today = new Date();
  today.setHours(0,0,0,0);

  if (isLoading) {
    return (<React.Fragment>
      <div>Loading Data</div>
    </React.Fragment>)
  } else {
    return (<React.Fragment>
      <div className="page-content">
        <Container fluid="fluid">
          <Breadcrumbs title="Tasks" breadcrumbItem="Task List"/> {/* Render Breadcrumbs */}
          <Row>
            <Col className='mb-4' sm={6}>
              <Dropdown isOpen={systemDropIsOpen} toggle={() => setSystemDropIsOpen(!systemDropIsOpen)}>
                <DropdownToggle className="btn btn-secondary" caret="caret">
                  {
                    chosenSystem.name
                      ? chosenSystem.name
                      : 'System'
                  }{" "}
                  <i className="mdi mdi-chevron-down"></i>
                </DropdownToggle>
                <DropdownMenu>
                  {
                    systems.map(system => {
                      return (<DropdownItem onClick={() => setChosenSystem({name: system.name, systemID: system.systemID})}>{system.name}</DropdownItem>)
                    })
                  }
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Not Taken
                  </CardTitle>
                  <div className="table-responsive">
                    <table className="table table-nowrap table-centered mb-0">
                      <tbody>
                        {
                          chosenSystem.systemID && systems.find(system => system.systemID == chosenSystem.systemID).tasks.filter(task => task.status == NOT_TAKEN).map(task => {
                          return(
                          <tr>
                            <td>
                              <h5 className="text-truncate font-size-14 m-0">
                                <Link to="#" className="text-dark">{task.title}</Link>
                              </h5>
                            </td>
                            <td>{task.shortDescription}</td>
                            <td>{task.createdAt}</td>
                          </tr>)
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Stuck
                  </CardTitle>
                  <div className="table-responsive">
                    <table className="table table-nowrap table-centered mb-0">
                      <tbody>
                        {
                          chosenSystem.systemID && systems.find(system => system.systemID == chosenSystem.systemID).tasks.filter(task => task.status == STUCK).map(task => {
                          return(
                          <tr>
                            <td>
                              <h5 className="text-truncate font-size-14 m-0">
                                <Link to="#" className="text-dark">{task.title}</Link>
                              </h5>
                            </td>
                            <td>{task.shortDescription}</td>
                            <td>{task.createdAt}</td>
                          </tr>)
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4">In Progress
                  </CardTitle>
                  <div className="table-responsive">
                    <table className="table table-nowrap table-centered mb-0">
                      <tbody>
                        {
                          chosenSystem.systemID && systems.find(system => system.systemID == chosenSystem.systemID).tasks.filter(task => task.status == IN_PROGRESS).map(task => {
                          return(
                          <tr>
                            <td>
                              <h5 className="text-truncate font-size-14 m-0">
                                <Link to="#" className="text-dark">{task.title}</Link>
                              </h5>
                            </td>
                            <td>{task.shortDescription}</td>
                            <td>{task.createdAt}</td>
                          </tr>)
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Completed
                  </CardTitle>
                  <div className="table-responsive">
                    <table className="table table-nowrap table-centered mb-0">
                      <tbody>
                        {
                          chosenSystem.systemID && systems.find(system => system.systemID == chosenSystem.systemID).tasks.filter(task => task.status == COMPLETED).filter(task => task.createdAt > today).map(task => {
                          return(
                          <tr>
                            <td>
                              <h5 className="text-truncate font-size-14 m-0">
                                <Link to="#" className="text-dark">{task.title}</Link>
                              </h5>
                            </td>
                            <td>{task.shortDescription}</td>
                            <td>{task.createdAt}</td>
                          </tr>)
                        })}
                      </tbody>
                    </table>
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

export default TasksList;
