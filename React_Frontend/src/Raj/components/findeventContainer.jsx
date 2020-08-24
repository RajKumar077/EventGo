//@Author - RajKumar B00849566

import React, { Component } from "react";
import FindEvent from "./notfications/requestsReceived";
import CreateEvent from "./createevent";
import SortAndSearch from "./sortAndSearch";
import PostEventHistory from "./posteventhist";
import { Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';
import "./events.css";
import Loader from './loader'


class FindEventContainer extends Component {
  constructor(props) {
    super(props);
    let isLoggedin = true;
    //const username = sessionStorage.getItem("username");
    const userId = Cookies.get("userId")
    if (userId == null) {
      isLoggedin = false;
    }
    this.state = {
      userId,
      loader: false,
      eventSelected: false,
      isLoggedin,
      eventTypeVal: "",
      fromAddress: "",
      toAddress: "",
      seats: 0,
      journeyDate: "",
      journeyDate2: "",
      dateToDisplay: "",
      dateToDisplay2: "",
      estPrice: 0,
      description: "",
      eventId: 0,
      updateItemId: 0,
      searchTerm: "",
      searchBy: "fromAddress",
      isValidated: false,
      sortyBy: "id",
      searchResults: [],
      searchResultsToDisplay: [],
      eventsHistory: [],
      requestToDisplay: {}
    };
  }

  //Find button click handler
  mySubmitHandler = async (event) => {
    this.setState({ loader: true });
    event.preventDefault();
    const {
      id,
      eventTypeVal,
      fromAddress,
      toAddress,
      seats,
      estPrice,
      dateToDisplay,
      dateToDisplay2,
    } = this.state;
    let { eventsHistory } = this.state;
    let isFiltered = false;


    //https://eventgoapi.herokuapp.com/findevents/findevents/
    //http://localhost:8080/findevents/findevents/
    await axios.get(`https://eventgoapi.herokuapp.com/findevents/findevents/` + this.state.userId)

      .then(res => {

        let eventsHistory = res.data;

        if (eventsHistory.length > 0) {
          if (eventTypeVal.length > 0) {
            eventsHistory = eventsHistory.filter(
              (item) =>
                item["eventTypeVal"].toLowerCase() == eventTypeVal.toLowerCase()
            );
            isFiltered = true;
          }
          if (fromAddress.length > 0) {
            eventsHistory = eventsHistory.filter(
              (item) =>
                item["fromAddress"].toLowerCase() == fromAddress.toLowerCase()
            );
            isFiltered = true;
          }
          if (toAddress.length > 0) {
            eventsHistory = eventsHistory.filter(
              (item) => item["toAddress"].toLowerCase() == toAddress.toLowerCase()
            );
            isFiltered = true;
          }
          if (dateToDisplay.length > 0 && dateToDisplay2.length > 0) {
            eventsHistory = eventsHistory.filter(
              (item) =>
                item["dateToDisplay"] >= dateToDisplay &&
                item["dateToDisplay"] <= dateToDisplay2
            );
            isFiltered = true;
          } else if (dateToDisplay.length > 0) {
            //console.log(dateToDisplay);
            eventsHistory = eventsHistory.filter(
              (item) => item["dateToDisplay"] == dateToDisplay
            );
            isFiltered = true;
          }
        }
        if (!isFiltered) {
          eventsHistory = [];
        }

        // eventsHistory.sort((a, b) => (a["bumped"] > b["bumped"] ? 1 : -1));
        this.setState({
          loader: false,
          searchResults: eventsHistory,
          searchResultsToDisplay: eventsHistory,
          eventTypeVal: "",
          fromAddress: "",
          toAddress: "",
          seats: 0,
          journeyDate: "",
          dateToDisplay: "",
          journeyDate2: "",
          dateToDisplay2: "",
          estPrice: 0,
          isValidated: false,
        });
      }).catch(err => {
        console.log(err);
        //this.setState({ data:"error" });
      })
  };

  //triggers when text entered to From and To fields
  onFromToEnter = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  //triggers when text entered to Description field
  onDescriptionEnter = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (value.length <= 100) {
      this.setState({ [name]: value });
    }
  };

   //triggers when text entered to From and To fields
  onEventddChange = (event) => {
    this.setState({ eventTypeVal: event.target.value });
  };

  //handle date change event
  handleDateChange = (date) => {
    let dateString = "";
    if (date != null) {
      let x = date.toString().split(" ");
      let mArr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let index = mArr.indexOf(x[1]) + 1;
      index =
        index.toString().length === 1
          ? "0" + index.toString()
          : index.toString();
      dateString = index + "/" + x[2] + "/" + x[3];
    }
    this.setState({
      journeyDate: date,
      dateToDisplay: dateString,
    });
  };

  handleDateChange2 = (date) => {
    let dateString = "";
    if (date != null) {
      let x = date.toString().split(" ");
      let mArr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let index = mArr.indexOf(x[1]) + 1;
      index =
        index.toString().length === 1
          ? "0" + index.toString()
          : index.toString();
      dateString = index + "/" + x[2] + "/" + x[3];
    }
    this.setState({
      journeyDate2: date,
      dateToDisplay2: dateString,
    });
  };

  //Click on posted events, updating feature.
  onPostedEvetClicked = (history) => {
    //console.log("FindEventContainer -> onPostedEvetClicked -> history", history)

    this.setState({ eventSelected: true, requestToDisplay: history });
  };

  /*Search and Sort Feature --start*/
  onSearchTermChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
    const searchBy = this.state.searchBy;
    let filteredsearchResults = "";
    if (value.length > 0) {
      filteredsearchResults = this.state.searchResults.filter(
        (item) =>
          item[searchBy]
            .toString()
            .toLowerCase()
            .indexOf(value.toString().toLowerCase()) != -1
      );
    } else {
      filteredsearchResults = this.state.searchResults;
    }
    this.setState({ searchResultsToDisplay: filteredsearchResults });
  };

  //searchby dropdown change event
  onSearchByChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  //sort dropdown change event
  onSortByChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
    let { searchResultsToDisplay } = this.state;
    searchResultsToDisplay.sort((a, b) => (a[value] > b[value] ? 1 : -1));
    this.setState({ searchResultsToDisplay: searchResultsToDisplay });
  };
  /*Search and Sort Feature --end*/

  onDeleteEvetClicked = (history) => {
    let { searchResultsToDisplay } = this.state;
    let filteredevents = searchResultsToDisplay.filter(
      (item) => item.eventid != history.eventid
    );
    this.setState({ searchResultsToDisplay: filteredevents });
  };

  renderSearchResults = () => {
    return this.state.searchResultsToDisplay.length > 0 ? (
      this.state.searchResultsToDisplay.map((item) => (
        <PostEventHistory
          key={item.eventid}
          eventHistory={item}
          onPostedEvetClicked={this.onPostedEvetClicked}
          onDeleteEvetClicked={this.onDeleteEvetClicked}
        />
      ))
    ) : (
        <div>No items to display</div>
      );
  };
  onNumInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (value >= 0) {
      this.setState({ [name]: value });
    }
  };

  render() {
    if (!this.state.isLoggedin) {
      return <Redirect to="/login" />;
    }
    if (this.state.eventSelected) {
      return <Redirect to={{ pathname: "/bookingdetails", state: this.state.requestToDisplay }} />;
    }
    return (
      <div className="pb-5">
        <Container>
          <Row>
            <Col>
              <CreateEvent
                mySubmitHandler={this.mySubmitHandler}
                onFromToEnter={this.onFromToEnter}
                onEventddChange={this.onEventddChange}
                handleDateChange={this.handleDateChange}
                handleDateChange2={this.handleDateChange2}
                onDescriptionEnter={this.onDescriptionEnter}
                onNumInputChange={this.onNumInputChange}
                eventTypeVal={this.state.eventTypeVal}
                fromAddress={this.state.fromAddress}
                toAddress={this.state.toAddress}
                seats={this.state.seats}
                journeyDate={this.state.journeyDate}
                journeyDate2={this.state.journeyDate2}
                estPrice={this.state.estPrice}
                description={this.state.description}
                isValidated={this.state.isValidated}
              />
            </Col>
            <Col>
              <br />
              <Row>
                <SortAndSearch
                  onSearchTermChange={this.onSearchTermChange}
                  onSearchByChange={this.onSearchByChange}
                  onSortByChange={this.onSortByChange}
                  searchTerm={this.state.searchTerm}
                  searchBy={this.state.searchBy}
                  sorthBy={this.state.sorthBy}
                />
              </Row>
              <Row className="justify-content-center align-items-center">
                {this.state.loader ? <Loader /> : this.renderSearchResults()}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default FindEventContainer;
