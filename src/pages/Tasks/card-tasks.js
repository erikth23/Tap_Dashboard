import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Input,
  Label,
  Badge
} from "reactstrap";

const CardTasks = (props) => {

  return (<React.Fragment>
    <Card>
      <CardBody>
        <CardTitle className="mb-4">{props.taskTitle}</CardTitle>
        <div className="table-responsive">
          <Table className="table-nowrap table-centered mb-0">
            <tbody>
              {
                props.data.map((task) => <tr>
                  <td style={{
                      width: "60px"
                    }}>
                    <div className="custom-control custom-checkbox">
                      {
                        task.isChecked
                          ? <Input type="checkbox" className="custom-control-input" checked="checked" id={"customCheck1_" + task.id}/>
                          : <Input type="checkbox" className="custom-control-input" id={"customCheck1_" + task.id}/>
                      }
                      <Label className="custom-control-label" htmlFor={"customCheck1_" + task.id}></Label>
                    </div>
                  </td>
                  <td>
                    <h5 className="text-truncate font-size-14 m-0">
                      <Link to="#" className="text-dark">{task.title}</Link>
                    </h5>
                  </td>
                  <td>
                    <div className="team">
                      {
                        task.teamMembers.map(
                          (member) => member.image !== "Null"
                          ? <Link to="#" className="team-member d-inline-block">
                            <img src={member.image} className="rounded-circle avatar-xs m-1" alt=""/>
                          </Link>
                          : <Link to="#" className="team-member d-inline-block">
                            <div className="avatar-xs">
                              <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                {member.imgText}
                              </span>
                            </div>
                          </Link>)
                      }
                    </div>
                  </td>
                  <td>
                    <div className="text-center">
                      <Badge color={task.color} className={"badge-soft-" + task.color + " font-size-11"} pill="pill">{task.tastStatus}</Badge>
                    </div>
                  </td>
                </tr>)
              }

            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  </React.Fragment>);
}

export default CardTasks;
