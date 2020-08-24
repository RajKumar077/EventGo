import React from "react";
import { Component } from "react";
import { FaHeart } from "react-icons/fa";
import { Img } from "react-image";

class ContactUs extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: "2em" }}>
        <div class="row">
          <div class="col-sm-3 jumbotron"></div>
          <div class="col-sm-6 jumbotron" align="center">
            <h1>Contact Us</h1>
            <p>We will love to hear from you.</p>
          </div>
          <div class="col-sm-3 jumbotron"></div>
        </div>
        <div
          class="row"
          style={{ backgroundColor: "#E9FFE9", paddingTop: "1em" }}
        >
          <div class="col-sm-5">
            <Img
              src={require("../images/rideshare.png")}
              width="700"
              fluid
              style={{ maxWidth: "100%", height: "auto", marginTop: "2em" }}
            />
          </div>
          <div class="col-sm-7">
            <h2>Office Location</h2>
            <span style={{ textTransform: "capitalize" }}> RideShare</span> is
            located at:
            <br />
            <address>
              6225 Duncan Street, Halifax <br />- NS , Canada
              <br />
            </address>
            <h2>Reach Out to Us</h2>
            E-mail at:
            <br />
            <address>
              contact@rideshare.ca <br /> static.amoli@dal.ca
              <br />
            </address>
            Call us on:
            <br />
            <address>
              +1(902)-802-0940 <br /> +1(902)-989-2500
              <br />
            </address>
            <p style={{ textAlign: "left" }}>
              Made with <FaHeart style={{ color: "red" }} /> at DAL{" "}
            </p>
            <p style={{ textAlign: "left" }}>
              RideShare, {new Date().getFullYear()} &copy;
            </p>
          </div>
        </div>

        <div
          class="container-fluid text-center jumbotron"
          style={{ marginTop: "1em" }}
        >
          <h4>Use RideShare To:</h4>
          <br />
          <div class="row">
            <div class="col-sm-4">
              <span class=""></span>
              <h4>Save Money</h4>
              <p>
                Why spend too much money on cabs or flights when you can
                carpool.
              </p>
            </div>
            <div class="col-sm-4">
              <span class=""></span>
              <h4>Have Fun</h4>
              <p>
                Share your journey and forget about the stress of driving alone.
              </p>
            </div>
            <div class="col-sm-4">
              <span class=""></span>
              <h4>Save Environment</h4>
              <p>
                Lets pool and go green. Low carbon emission and less traffic
                congestion.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;
