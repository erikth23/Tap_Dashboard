import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table
} from "reactstrap";
import {Link} from "react-router-dom";

//import Charts
import StackedColumnChart from "./StackedColumnChart";

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import SocialSource from "./SocialSource";
import ActivityComp from "./ActivityComp";
import TopCities from "./TopCities";
import LatestTranaction from "./LatestTranaction";
import Rooms from "./Rooms";
import SystemsTable from "./SystemsTable";
import TaskTable from "./TaskTable";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//i18n
import {withNamespaces} from 'react-i18next';

const Dashboard = (props) => {

  const [modal, setmodal] = useState(false);
  const [systems, setSystems] = useState([]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("authUser"));
    axios.post(process.env.REACT_APP_APIURL_DEV + '/systems/getSystemByAdmin',
        {adminEmail: user.email})
    .then((response) => {
      setSystems(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  const reports = [
    {
      title: "Orders",
      iconClass: "bx-copy-alt",
      description: "1,235"
    }, {
      title: "Revenue",
      iconClass: "bx-archive-in",
      description: "$35, 723"
    }, {
      title: "Average Price",
      iconClass: "bx-purchase-tag-alt",
      description: "$16.2"
    }
  ];
  const email = [
    {
      title: "Week",
      linkto: "#",
      isActive: false
    }, {
      title: "Month",
      linkto: "#",
      isActive: false
    }, {
      title: "Year",
      linkto: "#",
      isActive: true
    }
  ];

  return (<React.Fragment>
    <div className="page-content">
      <Container fluid="fluid">

        {/* Render Breadcrumb */}
        <Breadcrumbs title={props.t('Dashboard')} breadcrumbItem={props.t('Dashboard')}/>

        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4 float-sm-left">
                  Rooms
                </CardTitle>
                <div className="float-sm-right">
                  <div className="btn-group btn-group-md">
                    <button className="btn btn-dark">Occupied</button>
                    <button className="btn btn-success">Ready</button>
                    <button className="btn btn-danger">Dirty</button>
                    <button className="btn btn-warning">clean</button>
                  </div>
                </div>
                <div className="clearfix"></div>
                <Rooms />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl="4">
            <WelcomeComp/>
          </Col>
          <Col xl="8">
            <SystemsTable systems={systems}/>
          </Col>
        </Row>

        <Row>
          <Col xl="4">
            <ActivityComp/>
          </Col>
          <Col xl="8">
            <Card>
              <CardTitle className="m-4">
                Cleaning Time
              </CardTitle>
              <CardBody>
                <StackedColumnChart/>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="12">
            <TaskTable/>
          </Col>
        </Row>
      </Container>
    </div>
    <Modal isOpen={modal} role="dialog" autoFocus={true} centered={true} className="exampleModal" tabindex="-1" toggle={() => {
        setmodal(!modal);
      }}>
      <div className="modal-content">
        <ModalHeader toggle={() => {
            setmodal(!modal);
          }}>
          Order Details
        </ModalHeader >
        <ModalBody>
          <p className="mb-2">Product id:
            <span className="text-primary">#SK2540</span>
          </p>
          <p className="mb-4">Billing Name:
            <span className="text-primary">Neal Matthews</span>
          </p>

          <div className="table-responsive">
            <Table className="table table-centered table-nowrap">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div>
                      <img src={modalimage1} alt="" className="avatar-sm"/>
                    </div>
                  </th>
                  <td>
                    <div>
                      <h5 className="text-truncate font-size-14">Wireless Headphone (Black)</h5>
                      <p className="text-muted mb-0">$ 225 x 1</p>
                    </div>
                  </td>
                  <td>$ 255</td>
                </tr>
                <tr>
                  <th scope="row">
                    <div>
                      <img src={modalimage2} alt="" className="avatar-sm"/>
                    </div>
                  </th>
                  <td>
                    <div>
                      <h5 className="text-truncate font-size-14">Hoodie (Blue)</h5>
                      <p className="text-muted mb-0">$ 145 x 1</p>
                    </div>
                  </td>
                  <td>$ 145</td>
                </tr>
                <tr>
                  <td colspan="2">
                    <h6 className="m-0 text-right">Sub Total:</h6>
                  </td>
                  <td>$ 400</td>
                </tr>
                <tr>
                  <td colspan="2">
                    <h6 className="m-0 text-right">Shipping:</h6>
                  </td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td colspan="2">
                    <h6 className="m-0 text-right">Total:</h6>
                  </td>
                  <td>$ 400</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={() => {
              setmodal(!modal);
            }}>Close</Button>
        </ModalFooter>
      </div>
    </Modal>
  </React.Fragment>);
}

export default withNamespaces()(Dashboard);
