//@Author - RajKumar B00849566
//@Author - feedback Panchal B00828070

import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button, InputGroup, Col, Row } from "react-bootstrap";
import "./events.css";
import jsPDF from "jspdf";
import { AiFillFilePdf } from "react-icons/ai";
import Bump from "../../costestimator/PremiumUser/Bump/Bump";
import axios from "axios";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //render dropdown
  renderByEventdd = (etype) => {
    if (etype === "car") {
      return this.props.eventTypeVal === "cj" ? (
        <Row>
          <Form.Group as={Col}>
            <Form.Label>
              Seats available: {this.renderOptionalinLabel()}
            </Form.Label>
            <div className="def-number-input number-input">
              <Form.Control
                value={this.props.seats}
                name="seats"
                onChange={this.props.onNumInputChange}
                type="number"
                maxLength="2"
                placeholder="0"
              />
            </div>
          </Form.Group>
          <Form.Group as={Col} controlId="toAddr">
            <Form.Label>
              Estimated price: {this.renderOptionalinLabel()}
            </Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">CAD $</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="number"
                placeholder="0"
                name="estPrice"
                maxLength="5"
                onChange={this.props.onNumInputChange}
                aria-describedby="inputGroupPrepend"
                value={this.props.estPrice}
              />
            </InputGroup>
          </Form.Group>{" "}
        </Row>
      ) : null;
    }
  };

  renderDescription = () => {
    //console.log(this.props.isCreate);
    return this.props.isCreate ? (
      <Form.Row>
        <Form.Group as={Col} controlId="txtarea">
          <Form.Label>
            Description:{" "}
            <span className="fstyle">
              {100 - this.props.description.length} words remaining
            </span>
            {this.renderOptionalinLabel()}
          </Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Max 100 words.."
            name="description"
            maxLength="100"
            value={this.props.description}
            onChange={this.props.onDescriptionEnter}
          />
        </Form.Group>
      </Form.Row>
    ) : null;
  };

  //view for rendering upload image section
  renderUploadImg = () => {
    return this.props.isCreate ? (
      <Form.Row>
        <Form.Group as={Col} controlId="uploadimg">
          <Form.Label>
            Upload Image:{" "}
            {/* <span className="fstyle">
              {0} of 2 images uploaded
            </span> */}
            {this.renderOptionalinLabel()}
          </Form.Label>
          <Row>
            <Col>
              <input
                type="file"
                multiple
                className="form-control-file"
                id="imgupload"
                onChange={this.props.handleImgFiles}
                accept="image/*"
              />
            </Col>
            <Col>{this.renderClearImgBtn(this.props.imagePreviewUrl1)}</Col>
          </Row>

          {this.props.imageError}
          <br />
          <Row>
            <Col>{this.renderImgPreview(this.props.imagePreviewUrl1)}</Col>
            <Col>{this.renderImgPreview(this.props.imagePreviewUrl2)}</Col>
          </Row>
        </Form.Group>
      </Form.Row>
    ) : null;
  };

  //view for image preview section
  renderImgPreview = (img) => {
    return img != "" && img != null ? (
      <img
        className="uploadimg"
        src={img}
        width="200"
        height="200"
        border="1"
      />
    ) : null;
  };

  renderClearImgBtn = (img) => {
    return img != "" && img != null ? (
      <button onClick={this.props.onClearImgBtnClick}>clear</button>
    ) : null;
  };

  //render date range for find-event screen
  renderDateRange = () => {
    if (!this.props.isCreate) {
      return (
        <Form.Group as={Col} controlId="date">
          <Form.Label>
            Date Range <span className="fstyle">(Optional)</span>
          </Form.Label>
          <div>
            <DatePicker
              className="calenderpicker form-control"
              value={this.props.journeyDate2}
              name="journeyDate2"
              selected={this.props.journeyDate2}
              onChange={this.props.handleDateChange2}
            />
          </div>
        </Form.Group>
      );
    } else {
      return null;
    }
  };

  //(optional) text for lables
  renderOptionalinLabel = () => {
    return this.props.isCreate ? (
      <span className="fstyle">(Optional)</span>
    ) : null;
  };

  bumpEvent = () => {
    let url = "https://eventgoapi.herokuapp.com/createevent/bumpTimeStamp/";
    //let url = "http://localhost:8080/createevent/bumpTimeStamp/";
    console.log("props.eventid", this.props.eventID);
    axios
      .put(url + this.props.eventID)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  pdfGeneratorFun = () => {
    if (
      this.props.eventTypeVal === "" ||
      this.props.fromAddress === "" ||
      this.props.toAddress === ""
    ) {
      alert("You have to provide required fields in order to generate a PDF");
      return;
    } else {
      console.log("Type = ", this.props.eventTypeVal);
      console.log("From = ", this.props.fromAddress);
      console.log("To = ", this.props.toAddress);
      console.log("Date of Journey = ", this.props.journeyDate);
      console.log("Description = ", this.props.description);
      console.log("Seats = ", this.props.seats);
      console.log("TYPEOF = ", typeof this.props.seats);

      let myData = new jsPDF("p", "pt");

      myData.text("Your Information", 244, 60);

      myData.text(210, 90, "Event Type:");
      if (this.props.eventTypeVal === "cj") {
        myData.text(300, 90, "Car Journey");

        myData.text(20, 310, "Seats:");

        if (
          this.props.seats === undefined ||
          this.props.seats === null ||
          this.props.seats === 0
        ) {
          myData.text(80, 310, "0");
        } else {
          myData.text(80, 310, this.props.seats);
        }

        myData.text(20, 350, "Estimated Price:");

        if (
          this.props.estPrice === undefined ||
          this.props.estPrice === null ||
          this.props.estPrice === 0
        ) {
          myData.text(140, 350, "0");
        } else {
          myData.text(140, 350, this.props.estPrice);
        }
      } else if (this.props.eventTypeVal === "oe") {
        myData.text(300, 90, "Organizing Event");
      } else {
        myData.text(300, 90, "Flight Journey");
      }

      myData.text(20, 140, "From: ");
      myData.text(65, 140, this.props.fromAddress);

      myData.text(20, 180, "To:");
      myData.text(50, 180, this.props.toAddress);

      myData.text(20, 220, "Date of Journey:");
      myData.text(145, 220, this.props.journeyOnlyDate);

      myData.text(20, 260, "Description:");
      myData.text(110, 260, this.props.description);

      myData.save("PDFFile.pdf");
      alert("The PDF file is stored in your machine successfully.");
    }
  };

  renderPDFButton = () => {
    return this.props.isCreate ? (
      <Button
        style={{ backgroundColor: " #ed5c3d " }}
        onClick={this.pdfGeneratorFun}
      >
        <AiFillFilePdf /> Generate PDF
      </Button>
    ) : null;
  };

  render() {
    const myStyle = {
      width: "100%",
      height: "100%",
      // backgroundColor: "#c3c6d8",
      backgroundColor: "#ffffff",
      borderRadius: "7px",
      borderLeft: "0.6rem solid #2B85FD",
      boxShadow:
        "0 4.8px 4.2px rgba(0, 0, 0, 0.034), 0 8.7px 7.3px rgba(0, 0, 0, 0.048), 0 14.5px 12px rgba(0, 0, 0, 0.06), 0 24.3px 19.9px rgba(0, 0, 0, 0.072), 0 43.8px 35.4px rgba(0, 0, 0, 0.086), 0 102px 82px rgba(0, 0, 0, 0.12)",
    };

    let buttonText = this.props.isCreate
      ? this.props.isUpdate
        ? "Update"
        : "Create"
      : "Find Event";
    let hedingText = this.props.isCreate ? "Offer a Ride" : "Find a Ride";

    let showBump = this.props.isCreate ? !!this.props.isUpdate : false;

    return (
      <div>
        <br />
        <div style={myStyle}>
          <div>
            <Col>
              <h3>{hedingText}</h3>
            </Col>
          </div>

          <Col>
            <Form
              noValidate
              validated={this.props.isValidated}
              onSubmit={this.props.mySubmitHandler}
            >
              <Form.Row>
                <Form.Group as={Col} controlId="eventId">
                  <Form.Label>Event type:</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.props.eventTypeVal}
                    onChange={this.props.onEventddChange}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="cj">Car journey</option>
                    <option value="fj">Flight journey</option>
                    <option value="oe">Organizing event</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid type.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="fromAddr">
                  <Form.Label>From:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="From"
                    value={this.props.fromAddress}
                    name="fromAddress"
                    maxLength="20"
                    onChange={this.props.onFromToEnter}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="toAddr">
                  <Form.Label>To:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="To"
                    value={this.props.toAddress}
                    name="toAddress"
                    maxLength="20"
                    onChange={this.props.onFromToEnter}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="date">
                  <Form.Label>
                    Date of journey: {this.renderOptionalinLabel()}
                  </Form.Label>
                  <div>
                    <DatePicker
                      className="calenderpicker form-control"
                      value={this.props.journeyDate}
                      name="journeyDate"
                      selected={this.props.journeyDate}
                      onChange={this.props.handleDateChange}
                    />
                  </div>
                </Form.Group>
                {this.renderDateRange()}
              </Form.Row>

              <Form.Row>{this.renderByEventdd("car")}</Form.Row>
              {this.renderDescription()}
              {this.renderUploadImg()}
              <div style={{ paddingBottom: "10px" }}>
                <Row>
                  <Col>
                    <Button variant="primary" type="submit">
                      {buttonText}
                    </Button>
                  </Col>
                  <Col>
                    {showBump ? (
                      <Button variant="primary" onClick={this.bumpEvent}>
                        Bump Event
                      </Button>
                    ) : null}
                  </Col>

                  <Col>{this.renderPDFButton()}</Col>
                </Row>
              </div>
            </Form>
          </Col>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
