import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { TestCarousels } from "../TestCarousels/TestCarousels";
import "./Footer.css";
import fb from "../Images/A2FooterFb.png";
import insta from "../Images/A2FooterInsta.png";
import twit from "../Images/A2FooterTwitter.png";

export class FooterCus extends Component {
  render() {
    return (
      <footer>
        <section>
          <br />
          <Navbar
            className="footer"
            bg="dark"
            variant="dark"
            expand="lg"
            sticky="bottom"
          >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <ul></ul>
              <ul></ul>
              <ul></ul>
              <ul></ul>
              <ul></ul>
              <ul></ul>
              <ul></ul>
              <ul>
                <Nav.Link className="footer-info" href="/aboutus">
                  About Us
                </Nav.Link>
                {/* <Nav.Link className="footer-info" href="/underimplementation">
                  FAQs
                </Nav.Link> */}
                <Nav.Link className="footer-info" href="/feedback">
                  Feedback
                </Nav.Link>
              </ul>
              <ul></ul>
              <ul></ul>
              <ul></ul>
              <ul className="navbar-nav">
                <Nav.Link
                  className="footer-info"
                  href="https://www.facebook.com/"
                  //href="/carousel"
                >
                  <img
                    src={fb}
                    id="fb-link"
                    className="img-fluid"
                    width="50"
                    height="50"
                    alt=""
                  />
                </Nav.Link>
                &nbsp; &nbsp; &nbsp;
                <Nav.Link
                  className="footer-info"
                  href="https://www.instagram.com/"
                >
                  <img
                    src={insta}
                    id="insta-links"
                    className="img-fluid"
                    width="50"
                    height="50"
                    alt=""
                  />
                </Nav.Link>
                &nbsp; &nbsp; &nbsp;
                <Nav.Link
                  className="footer-info"
                  href="https://twitter.com/explore"
                >
                  <img
                    src={twit}
                    id="twit-links"
                    className="img-fluid"
                    width="53"
                    height="53"
                    alt=""
                  />
                </Nav.Link>
              </ul>
              <ul></ul>
              <ul>
                <Nav.Link className="footer-info" href="/ContactUs">
                  Contact Us
                </Nav.Link>
                <Nav.Link className="footer-info" href="/terms">
                  Terms and Conditions
                </Nav.Link>
                {/* <Nav.Link className="footer-info" href="/privacy">
                  Privacy Policy
                </Nav.Link> */}
              </ul>
            </Navbar.Collapse>
          </Navbar>
        </section>

        <section>
          <Navbar bg="light" variant="light" expand="lg" sticky="bottom">
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="navbar-nav">
              &copy; {new Date().getFullYear()} Copyright:{" "}
              <a href="/home"> RideShare.com </a>
            </ul>
            <ul className="navbar-nav mr-auto"></ul>
          </Navbar>
        </section>
      </footer>
    );
  }
}
