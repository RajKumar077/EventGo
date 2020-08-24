//@Author - RajKumar B00849566
/* @Author - password Makwana B00842568 */

import React, { Component } from "react";
import { Card, Accordion, Button, Row, Col } from "react-bootstrap";
import { BsFillXCircleFill } from "react-icons/bs";
import { FcOk } from "react-icons/fc";
import { MdHourglassFull } from "react-icons/md";
import { Redirect } from "react-router-dom";

class ResponseMainCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "",
      showProfie: false,
    };
  }

  componentDidMount() {
    let timeStamp = this.props.eventDetail.timeStamp;
    if (timeStamp != null) {
      let time = timeStamp.split("T");
      let timeString = time[0] + " " + time[1].split(".")[0];
      //console.log(timeString)
      this.setState({ time: timeString });
    }
  }

  //Event description renders here
  renderHeader = () => {
    if (this.props.eventDetail.status == 1) {
      return (
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          From <strong>{this.props.eventDetail.fromAddress}</strong> to{" "}
          <strong>{this.props.eventDetail.toAddress}</strong> on{" "}
          <strong>{this.props.eventDetail.dateToDisplay}</strong> Seats
          available: <strong>{this.props.eventDetail.seats} </strong>
          Estimated price: <strong>$ {this.props.eventDetail.estPrice} </strong>
          Description: <strong>{this.props.eventDetail.description}</strong>
        </Accordion.Toggle>
      );
    } else {
      return (
        <button type="button" className="btn" style={{ cursor: "auto" }}>
          From <strong>{this.props.eventDetail.fromAddress}</strong> to{" "}
          <strong>{this.props.eventDetail.toAddress}</strong> on{" "}
          <strong>{this.props.eventDetail.dateToDisplay}</strong> Seats
          available: <strong>{this.props.eventDetail.seats} </strong>
          Estimated price: <strong>$ {this.props.eventDetail.estPrice} </strong>
          Description: <strong>{this.props.eventDetail.description}</strong>
        </button>
      );
    }
  };

  //status of the event display
  renderFooterText = () => {
    if (this.props.eventDetail.status == 1) {
      return (
        <div>
          <FcOk /> <span style={{ fontStyle: "italic" }}>Accepted</span>
        </div>
      );
    } else if (this.props.eventDetail.status == 0) {
      return (
        <div>
          <BsFillXCircleFill style={{ color: "#dc3545" }} />{" "}
          <span style={{ fontStyle: "italic" }}>Declined </span>
        </div>
      );
    } else {
      return (
        <div>
          <MdHourglassFull style={{ color: "#ed9106" }} />{" "}
          <span style={{ fontStyle: "italic" }}>Pending </span>
        </div>
      );
    }
  };

  showProfile = () => {
    this.setState({ showProfie: true });
  };

  render() {
    if (this.state.showProfie) {
      let _userId = this.props.eventDetail.createrUserId;
      return <Redirect to={{ pathname: "/viewprofile", userId: _userId }} />;
    }

    return (
      <div>
        <Accordion>
          <Card border="secondary">
            <Card.Header style={{ padding: "0" }}>
              {this.renderHeader()}
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                event owner details to contact...
                <Row>
                  <Col md={{ span: 5, offset: 4 }}>
                    <Button
                      className="btn btn-success"
                      type="button"
                      onClick={this.showProfile}
                    >
                      Contact Ride Giver!
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
            <Card.Footer className="justify-content-end">
              <Row>
                <Col>
                  <small className="text-muted">
                    {" "}
                    {this.renderFooterText()}
                  </small>
                </Col>
                <Col>
                  <small className="text-muted">{this.state.time}</small>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Accordion>
        <br />
      </div>
    );
  }
}

export default ResponseMainCard;
