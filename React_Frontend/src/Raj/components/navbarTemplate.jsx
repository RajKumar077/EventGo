//@Author - RajKumar B00849566
/* @Author - password Makwana B00842568 */
import React, { Component } from "react";
import NavbarHeader from "./navbarHeader";
import createeventContainer from "./createeventContainer";
import FindEventContainer from "./findeventContainer";
import home from "./home";
import Error from "./errorpage";
import "./events.css";
import profilepage from "../../profile/components/profile";
import bookingdetails from "../../profile/components/booking_details";
import verifyid from "../../profile/components/verify_id";
import editprofile from "../../profile/components/EditProfile";
import { Route, Switch } from "react-router-dom";
import Feedback from "../../feedback/components/feedback";
import AboutUs from "../../static/components/AboutUs";
import Terms from "../../static/components/Terms";
import PrivacyPolicies from "../../static/components/PrivacyPolicies";
import ContactUs from "../../static/components/ContactUs";
import viewProfile from "../../password/viewProfile";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Col,
  Container,
  Row,
} from "react-bootstrap";

class NavbarTemplate extends Component {
  state = {};
  render() {
    return (
      <div>
        <div>
          <NavbarHeader />
        </div>

        <div className="content" style={{ overflow: "auto", height: "100%" }}>
          <Switch>
            <Route exact path="/" component={home} />
            <Route
              exact
              path="/createevent"
              component={createeventContainer}
            ></Route>
            <Route
              exact
              path="/findevent"
              component={FindEventContainer}
            ></Route>
            <Route exact path="/home" component={home}></Route>
            <Route exact path="/profile" component={profilepage}></Route>
            <Route
              exact
              path="/bookingdetails"
              component={bookingdetails}
            ></Route>
            <Route exact path="/viewprofile" component={viewProfile}></Route>
            <Route exact path="/verifyid" component={verifyid}></Route>
            <Route exact path="/editprofile" component={editprofile}></Route>
            <Route exact path="/aboutus" component={AboutUs}></Route>
            <Route exact path="/privacy" component={PrivacyPolicies}></Route>
            <Route exact path="/feedback" component={Feedback}></Route>
            <Route exact path="/terms" component={Terms}></Route>
            <Route exact path="/contactus" component={ContactUs}></Route>
            <Route exact path="/*" component={Error} />
          </Switch>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default NavbarTemplate;
