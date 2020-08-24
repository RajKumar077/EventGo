//@Author - RajKumar B00849566
/* @Author - password Makwana B00842568 */

import React, { Component } from "react";
import ReqMainCard from "./requestMainCard";
import axios from "axios";
import "../events.css";
import Loader from "../loader";
import Cookies from "js-cookie";

class RequestsReceived extends Component {
  constructor(props) {
    super(props);
    const userId = Cookies.get("userId");
    this.state = {
      userId,
      loader: false,
      eventDetails: [],
    };
  }

  //GET all the posted events in the notifications screen
  async componentDidMount() {
    this.setState({ loader: true });
    //https://eventgoapi.herokuapp.com/requestsreceived/getrequests/
    //http://localhost:8080/requestsreceived/getrequests/
    await axios
      .get(
        `https://eventgoapi.herokuapp.com/requestsreceived/getrequests/` +
          this.state.userId
      )
      .then((res) => {
        const data = res.data;

        //console.log(data);
        data.events.forEach(function (item, index) {
          item.requests = [];
          //console.log(item, index);
          let e = data.requests.filter(
            (request) => request.eventid == item.eventid
          );
          //console.log(e);
          item.requests = item.requests.concat(e);
        });
        //console.log(data.events);
        this.setState({ loader: false, eventDetails: data.events });
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
          Requests received for created Rides
        </h4>
        <br />
        {this.state.loader ? (
          <Loader />
        ) : this.state.eventDetails.length > 0 ? (
          this.state.eventDetails.map((item) => (
            <ReqMainCard key={item.eventid} eventDetail={item} />
          ))
        ) : (
          <h4
            style={{ textAlign: "center", color: "#013b75", height: "240px" }}
          >
            No Notifications...Create a Ride!!
          </h4>
        )}
      </div>
    );
  }
}

export default RequestsReceived;
