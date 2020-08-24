//@Author - RajKumar B00849566
/* @Author - password Makwana B00842568 */

import React, { Component } from "react";
import ResponseMainCard from "./responseMainCard";
import axios from "axios";
import "../events.css";
import Loader from "../loader";
import Cookies from "js-cookie";

class ResponsesReceived extends Component {
  constructor(props) {
    super(props);
    const userId = Cookies.get("userId");
    this.state = {
      userId,
      loader: false,
      eventDetails: [],
    };
  }

  //GET all the responses in the notifications screen
  async componentDidMount() {
    this.setState({ loader: true });
    //https://eventgoapi.herokuapp.com/requestsreceived/getresponses/
    //http://localhost:8080/requestsreceived/getresponses/
    await axios
      .get(
        `https://eventgoapi.herokuapp.com/requestsreceived/getresponses/` +
          this.state.userId
      )
      .then((res) => {
        const data = res.data;
        // console.log(data.requests.length); //2
        // console.log(data.requests[0].eventid);
        this.setState({ loader: false, eventDetails: data.requests });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  fixFooterHeight = () => {
    return this.state.eventDetails.length == 1 ? "110px" : "0px";
  };
  render() {
    return (
      <div style={{ paddingBottom: this.fixFooterHeight() }}>
        <h4 style={{ textAlign: "center" }}>
          Responses received for requested Rides
        </h4>
        <br />
        {this.state.eventDetails.length > 0 ? (
          this.state.eventDetails.map((item) => (
            <ResponseMainCard key={item.requesteventId} eventDetail={item} />
          ))
        ) : (
          <h4
            style={{ textAlign: "center", color: "#013b75", height: "240px" }}
          >
            No Notifications...Request a Ride!!
          </h4>
        )}
      </div>
    );
  }
}

export default ResponsesReceived;
