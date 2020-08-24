import React, { Component } from "react";
import {
  Row,
  Card,
  Col,
  InputGroup,
  Button,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import { storage } from "../../Raj/firebase";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

class BookingDetails extends Component {
  constructor(props) {
    super(props);

    let isLoggedin = true;

    const userId = Cookies.get("userId");
    if (userId == null) {
      isLoggedin = false;
    }
    this.state = {
      isLoggedin,
      eventid: this.props.location.state.eventid,
      userid: userId,
      seats: 1,
      description: "",
      status: -1,
    };
  }

  onClickIncreasehandler = () => {
    if (this.state.seats === this.props.location.state.seats) {
      alert(
        `no more than ${this.props.location.state.seats} people allowed for current request!!`
      );
    } else {
      this.setState({ seats: this.state.seats + 1 });
    }
  };

  onClickDecreasehandler = () => {
    if (this.state.seats === 1) {
      alert("need atleast 1 person to make a request");
    } else {
      this.setState({ seats: this.state.counterValue - 1 });
    }
  };

  Requestevent = async (event) => {
    console.log(event);
    await axios
      .post(
        `https://eventgoapi.herokuapp.com/requestsreceived/postrequest/` +
          this.state.userid,
        event
      )
      .then((res) => {
        if (res.data == "exist") {
          alert(
            "You already have requested for this event !! Wait for response from organiser.."
          );
        } else {
          alert("Request Succesfull");
        }
      })
      .catch((err) => {
        console.log("Inside catch");
        console.log(err);
      });
  };

  renderImgPreview = (img) => {
    return img != "" && img != null ? (
      <img
        className="uploadimg"
        src={img}
        width="200rem"
        height="200rem"
        border="1"
      />
    ) : null;
  };

  recordText = (e) => {
    this.setState({ description: e.target.value });
    console.log(this.state.description);
  };

  render() {
    if (!this.state.isLoggedin) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="pb-5">
        <Row>
          <Col className="col-lg-7 col-md-7 col-sm-11 col-xs-11 col-11">
            <Card
              style={{
                margin: "3rem 1rem 2rem 4rem ",
                border: "0",
                borderLeft: "0.6rem solid",
                // boxShadow: "1rem 1rem 0.5rem #a2a2a2",
                boxShadow:
                  "0 4.8px 4.2px rgba(0, 0, 0, 0.034), 0 8.7px 7.3px rgba(0, 0, 0, 0.048), 0 14.5px 12px rgba(0, 0, 0, 0.06), 0 24.3px 19.9px rgba(0, 0, 0, 0.072), 0 43.8px 35.4px rgba(0, 0, 0, 0.086), 0 102px 82px rgba(0, 0, 0, 0.12)",
              }}
            >
              <h1 className="m-3" style={{ textAlign: "start" }}>
                {" "}
                Request-A-Ride
              </h1>
              <br />

              <Row className="m-3">
                <h6>Ride details</h6>
              </Row>
              <Row>
                <Col className="col-lg-5 col-md-11 col-sm-11 col-xs-11 col-11">
                  <InputGroup className="m-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">From:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder={this.props.location.state.fromAddress}
                      aria-describedby="basic-addon1"
                      readOnly
                    />
                  </InputGroup>
                </Col>
                <Col className="col-lg-5 col-md-11 col-sm-11 col-xs-11 col-11">
                  <InputGroup className="m-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        Destination:
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder={this.props.location.state.toAddress}
                      aria-describedby="basic-addon1"
                      readOnly
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col className="col-lg-5 col-md-11 col-sm-11 col-xs-11 col-11">
                  <InputGroup className="m-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Date:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder={this.props.location.state.doj}
                      aria-describedby="basic-addon1"
                      readOnly
                    />
                  </InputGroup>
                </Col>
                <Col className="col-lg-5 col-md-11 col-sm-11 col-xs-11 col-11">
                  {/* <InputGroup className="m-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Time:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="3:00PM AST"
                      aria-describedby="basic-addon1"
                      readOnly
                    />
                  </InputGroup> */}
                </Col>
              </Row>
              <Row>
                <Col className="col-lg-5 col-md-11 col-sm-11 col-xs-11 col-11">
                  <InputGroup className="m-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        Max people:
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder={this.props.location.state.seats}
                      aria-describedby="basic-addon1"
                      readOnly
                    />
                  </InputGroup>
                </Col>
                <Col className="col-lg-5 col-md-11 col-sm-11 col-xs-11 col-11">
                  <InputGroup className="m-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        Est. Cost (each):
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder={this.props.location.state.estPrice}
                      aria-describedby="basic-addon1"
                      readOnly
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row className="m-3">
                <h6> Description / Rules </h6>
              </Row>
              <Row className="m-3">
                <p style={{ width: "90%" }}>
                  {this.props.location.state.description}
                </p>
              </Row>
              <Row className="m-3">
                <h6>Photos </h6>
              </Row>
              <Row className="m-3">
                <Col>
                  {this.renderImgPreview(this.props.location.state.imageurl1)}
                </Col>
                <Col>
                  {this.renderImgPreview(this.props.location.state.imageurl2)}
                </Col>
              </Row>
              <Row className="m-3 mb-5"></Row>
            </Card>
          </Col>
          <Col className="col-lg-4 col-md-4 col-sm-11 col-xs-11 col-11">
            <Row>
              <Card
                style={{
                  margin: "3rem 1rem 2rem 4rem ",
                  //   boxShadow: "1rem 1rem 0.5rem #a2a2a2",
                  boxShadow:
                    "0 4.8px 4.2px rgba(0, 0, 0, 0.034), 0 8.7px 7.3px rgba(0, 0, 0, 0.048), 0 14.5px 12px rgba(0, 0, 0, 0.06), 0 24.3px 19.9px rgba(0, 0, 0, 0.072), 0 43.8px 35.4px rgba(0, 0, 0, 0.086), 0 102px 82px rgba(0, 0, 0, 0.12)",
                  border: "0",
                  borderLeft: "0.6rem solid #ffae00",
                  width: "100%",
                }}
              >
                <Row className="m-3 justify-content-center">
                  <h4> Number Of People</h4>
                </Row>
                <Row className="m-3 justify-content-center">
                  <Button
                    variant="warning"
                    onClick={() => this.onClickDecreasehandler()}
                  >
                    <h3>-</h3>
                  </Button>
                  <span className="text-center mt-1" style={{ width: "3rem" }}>
                    <h3>{this.state.seats}</h3>
                  </span>
                  <Button
                    variant="warning"
                    onClick={() => this.onClickIncreasehandler()}
                  >
                    <h3>+</h3>
                  </Button>
                </Row>
                <Row className="m-3 justify-content-center">
                  <h4>
                    Total : $
                    {this.state.seats * this.props.location.state.estPrice} CAD
                  </h4>
                </Row>
                <Row className="justify-content-center mb-5">
                  <Button
                    variant="outline-warning"
                    onClick={() => this.Requestevent(this.state)}
                  >
                    <h4>Send Request to Join</h4>
                  </Button>
                </Row>
              </Card>
            </Row>
            <Row>
              <Card
                style={{
                  margin: "3rem 1rem 2rem 4rem ",
                  //   boxShadow: "1rem 1rem 0.5rem #a2a2a2",
                  boxShadow:
                    "0 4.8px 4.2px rgba(0, 0, 0, 0.034), 0 8.7px 7.3px rgba(0, 0, 0, 0.048), 0 14.5px 12px rgba(0, 0, 0, 0.06), 0 24.3px 19.9px rgba(0, 0, 0, 0.072), 0 43.8px 35.4px rgba(0, 0, 0, 0.086), 0 102px 82px rgba(0, 0, 0, 0.12)",
                  border: "0",
                  borderLeft: "0.6rem solid #2B85FD",
                  width: "100%",
                }}
              >
                <Row className="m-3">
                  <h3 style={{ color: "#2B85FD", textAlign: "center" }}>
                    Send message to Organiser <h5>(optional)</h5>
                  </h3>
                  <hr />
                </Row>

                {/* <Row className="mb-2 p-2 justify-content-center">
                  <Col className="col-5 text-center">
                    <img
                      src={
                        "https://cdn.freebiesupply.com/logos/large/2x/twitter-logo-black-and-white.png"
                      }
                      alt="twitter logo"
                      width="60rem"
                    />
                  </Col>
                  <Col>
                    <h4 style={{ color: "black" }}>@Rdj_229</h4>
                  </Col>
                </Row> */}
                <Row className=" pl-4 pr-4 justify-content-center mb-3">
                  {/* <Col className="col-5 text-center">
                    <img
                      src={
                        "https://sguru.org/wp-content/uploads/2018/01/instagram-logo-black-transparent.png"
                      }
                      alt="twitter logo"
                      width="60Rem"
                    />
                  </Col>
                  <Col>
                    <h4 style={{ color: "black" }}>@Rdj_insta_229</h4>
                  </Col> */}
                  <label for="exampleFormControlTextarea1">
                    {" "}
                    <b>Message:</b>{" "}
                  </label>
                  <textarea
                    className="form-control"
                    id="Textarea1"
                    rows="3"
                    placeholder="Write something..."
                    onChange={(e) => this.recordText(e)}
                    value={this.state.description}
                  ></textarea>
                </Row>
              </Card>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BookingDetails;
