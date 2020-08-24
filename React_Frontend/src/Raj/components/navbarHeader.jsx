//@Author - RajKumar B00849566
/* @Author - password Makwana B00842568 */

import React, { Component } from "react";
import { Nav, Button, Row, Col, Navbar } from "react-bootstrap";
import { Redirect, NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { MdNotificationsActive } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import CostEstimator from "../../costestimator/Estimator/CostEstimator";
import axios from "axios";
import ModalPremium from "../../costestimator/PremiumUser/PremiumButton/Modal";

class NavbarHeader extends Component {
  constructor(props) {
    super(props);

    let isLoggedin = true;
    //const username = sessionStorage.getItem("username");
    const username = Cookies.get("userName");
    const userID = Cookies.get("userId");
    if (username == null) {
      isLoggedin = false;
    }

    this.state = {
      isLoggedin,
      username,
      isLogoutClicked: false,
      userID,
    };
  }

  onButtonClick = () => {
    if (this.state.isLoggedin) {
      //sessionStorage.clear();
      Cookies.remove("userId");
      Cookies.remove("userName");
      Cookies.remove("email");
      Cookies.remove("isPremium");
      this.setState({ isLoggedin: false, isLogoutClicked: true });
    } else {
      this.setState({ isLoggedin: false, isLogoutClicked: true });
    }
  };

  render() {
    const signinText = this.state.isLoggedin ? (
      <div>
        <FaUserCircle
          style={{ color: "white", height: "29px", width: "35px" }}
        />
        <a style={{ color: "white", fontSize: "20px" }} href="profile">
          {this.state.username}
        </a>
      </div>
    ) : null;
    console.log("state", this.state.userID);
    const buttonText = this.state.isLoggedin ? "Logout" : "Login/Register";

    if (this.state.isLogoutClicked) {
      return <Redirect to="/login" />;
    }

    return (
      <section>
        <Navbar className="navbg" expand="lg" sticky="top">
          <section>
            <Navbar.Brand href="home">
              <img src={logo} alt="logo" style={{ height: "35px" }} />
              <strong style={{ fontFamily: "unset", fontSize: "medium" }}>
                RideShare
              </strong>
            </Navbar.Brand>
          </section>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <ul className="navbar-nav">
              <Nav className="ml-auto" variant="pills">
                <NavLink
                  exact
                  activeClassName="nav-link active"
                  className="nav-link"
                  to="/createevent"
                  style={{ color: "white" }}
                >
                  Offer a Ride
                </NavLink>
                <NavLink
                  exact
                  activeClassName="nav-link active"
                  className="nav-link"
                  to="/findevent"
                  style={{ color: "white" }}
                >
                  Find a Ride
                </NavLink>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  style={{ backgroundColor: "transparent" }}
                >
                  Cost Estimator
                </button>
              </Nav>
            </ul>
            <ul className="navbar-nav mr-auto" />
            <Nav className="ml-auto" variant="pills">
              {signinText}
              &nbsp; &nbsp;
              <NavLink
                exact
                activeClassName="nav-link active"
                className="nav-link"
                to="/home"
                style={{ color: "white" }}
              >
                <MdNotificationsActive
                  style={{ color: "white", height: "29px", width: "35px" }}
                />
              </NavLink>
              &nbsp; &nbsp;
              {/*<Button*/}
              {/*    variant="primary"*/}
              {/*    type="submit"*/}
              {/*    onClick={this.makePremium}*/}
              {/*    style={{ backgroundColor: "transparent" }}*/}
              {/*>*/}
              {/*  Go Premium*/}
              {/*</Button>*/}
              {Cookies.get("isPremium") == 0 ? (
                <ModalPremium userID={this.state.userID} />
              ) : null}
              &nbsp; &nbsp;
              <Button
                variant="primary"
                type="submit"
                onClick={this.onButtonClick}
                style={{ backgroundColor: "transparent" }}
              >
                {buttonText}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Cost Estimator
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="text-center">
                  <CostEstimator />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default NavbarHeader;
