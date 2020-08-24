//@Author - RajKumar B00849566

import React, { Component } from "react";
import { Form, Button, InputGroup, Col, Row } from "react-bootstrap";

class SortAndSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const myStyle = {
      // width: "100%",
      // height: "100%",
      // backgroundColor: "#c3c6d8",
      backgroundColor: "#ffffff",
      borderRadius: "7px",
      borderLeft: "0.6rem solid #5cb85c",
      boxShadow:
        "0 4.8px 4.2px rgba(0, 0, 0, 0.034), 0 8.7px 7.3px rgba(0, 0, 0, 0.048), 0 14.5px 12px rgba(0, 0, 0, 0.06), 0 24.3px 19.9px rgba(0, 0, 0, 0.072), 0 43.8px 35.4px rgba(0, 0, 0, 0.086), 0 102px 82px rgba(0, 0, 0, 0.12)",
    };
    const header = this.props.isCreate ? "Events History" : "Search Results";
    return (
      <div style={myStyle}>
        <Col>
          <Row>
            <Col>
              <h3>{header}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="eventId">
                <Form.Label>Search by:</Form.Label>
                <Form.Control
                  as="select"
                  value={this.props.searchBy}
                  name="searchBy"
                  onChange={this.props.onSearchByChange}
                >
                  <option value="fromAddress">From</option>
                  <option value="toAddress">To</option>
                  <option value="seats">Seats</option>
                  <option value="estPrice">Price</option>
                  <option value="description">Description</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="search">
                <Form.Label>Search:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search.."
                  value={this.props.searchTerm}
                  name="searchTerm"
                  onChange={this.props.onSearchTermChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="searchById">
                <Form.Label>Sort by:</Form.Label>
                <Form.Control
                  as="select"
                  value={this.props.sortyBy}
                  name="sorthBy"
                  onChange={this.props.onSortByChange}
                >

                  <option value="id">Event added</option>
                  <option value="fromAddress">From</option>
                  <option value="toAddress">To</option>
                  <option value="doj">Date of Journey</option>
                  <option value="seats">Seats</option>
                  <option value="estPrice">Price</option>
                  <option value="description">Description</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}

export default SortAndSearch;
