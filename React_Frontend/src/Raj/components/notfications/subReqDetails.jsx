//@Author - RajKumar B00849566
/* @Author - password Makwana B00842568 */
//Render requests for a event

import React, { Component } from "react";
import { Button, Row, Col, Card, Alert } from "react-bootstrap";
import { BsFillXCircleFill } from "react-icons/bs";
import { FcOk } from "react-icons/fc";
import axios from "axios";
import { Redirect } from "react-router-dom";

class SubReqDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      time: "",
      name: "",
      email: "",
      phone: "",
      gender: "",
      showRequester: false,
    };
  }

  componentDidMount() {
    let eventid = this.props.data.eventid;
    let requesteventId = this.props.data.requesteventId;
    const getReqStatusURL = `https://eventgoapi.herokuapp.com/requestsreceived/getReqStatus/${eventid}/${requesteventId}`;
    // const getReqStatusURL = `http://localhost:8080/requestsreceived/getReqStatus/${eventid}/${requesteventId}`;
    axios
      .get(getReqStatusURL)
      .then((res) => {
        let timeStamp = res.data[0].timeStamp;
        let status = res.data[0].status;
        if (status == 1) {
          this.setState({ status: "accept" });
        } else if (status == 0) {
          this.setState({ status: "reject" });
        }
        if (timeStamp != null) {
          let time = timeStamp.split("T");
          let timeString = time[0] + " " + time[1].split(".")[0];
          this.setState({ time: timeString });
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  onClickInfo = () => {
    this.setState({ showRequester: true });
  };

  //click event for Accept button
  onClickAccept = () => {
    this.setState({ status: "accept" });
    let eventid = this.props.data.eventid;
    const manageReqURL = `https://eventgoapi.herokuapp.com/requestsreceived/manageReq/${eventid}/1`;
    // const manageReqURL = `http://localhost:8080/requestsreceived/manageReq/${eventid}/1`;
    axios
      .put(manageReqURL)
      .then((res) => {
        // console.log(res.data);
        alert(
          "Request successfully accepted!\nNotification has been sent to the Requester."
        );
      })
      .catch((err) => {
        // console.log(err);
        alert("Error from server.");
      });
  };

  //click event for Reject button
  onClickReject = () => {
    this.setState({ status: "reject" });
    let eventid = this.props.data.eventid;
    const manageReqURL = `https://eventgoapi.herokuapp.com/requestsreceived/manageReq/${eventid}/0`;
    // const manageReqURL = `http://localhost:8080/requestsreceived/manageReq/${eventid}/0`;
    axios
      .put(manageReqURL)
      .then((res) => {
        // console.log(res.data);
        alert(
          "Request declined.\nNotification has been sent to the Requester."
        );
      })
      .catch((err) => {
        // console.log(err);
        alert("Error from server.");
      });
  };

  render() {
    if (this.state.showRequester) {
      // console.log("This is email: " + this.email);
      let _userId = this.props.data.userid;
      return <Redirect to={{ pathname: "/viewprofile", userId: _userId }} />;
    }
    let icon = "";
    if (this.state.status == "accept") {
      icon = (
        <div>
          <FcOk /> <span style={{ fontStyle: "italic" }}>Accepted </span>
        </div>
      );
    } else if (this.state.status == "reject") {
      icon = (
        <div>
          <BsFillXCircleFill style={{ color: "#dc3545" }} />{" "}
          <span style={{ fontStyle: "italic" }}>Declined </span>
        </div>
      );
    } else {
      icon = <span style={{ fontStyle: "italic" }}>No action taken </span>;
    }

    return (
      <div>
        <br />
        <Card border="secondary">
          <Card.Body style={{ backgroundColor: "#c3c6d8" }}>
            <Row md={3} sm={2} xs={1}>
              <Col>
                <Button
                  className="btn btn-info"
                  type="button"
                  onClick={this.onClickInfo}
                >
                  Requester
                </Button>
              </Col>
              <Col>
                <Button
                  className="btn btn-success"
                  type="button"
                  onClick={this.onClickAccept}
                >
                  Accept
                </Button>
              </Col>
              <Col>
                <Button
                  className="btn btn-danger"
                  type="button"
                  onClick={this.onClickReject}
                >
                  Decline
                </Button>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="justify-content-end">
            <Row>
              <Col>
                <small className="text-muted"> {icon}</small>
              </Col>
              <Col>
                <small className="text-muted">{this.state.time}</small>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default SubReqDetails;
