import React from "react";
import { Component } from "react";
import { FaHeart } from "react-icons/fa";
import { Img } from "react-image";

class AboutUs extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: "2em" }}>
        <div class="row">
          <div class="col-sm-3 jumbotron"></div>
          <div class="col-sm-6 jumbotron" align="center">
            <h1>We are RideShare</h1>
            <p>Providing you with the best carpooling service.</p>

            {/* <form class="form-inline">
              <div class="input-group">
                <input
                  type="email"
                  class="form-control"
                  size="50"
                  placeholder="Email Address"
                  required
                />
                <div class="input-group-btn">
                  <button type="button" class="btn btn-danger">
                    Subscribe
                  </button>
                </div>
              </div>
            </form> */}
          </div>
          <div class="col-sm-3 jumbotron"></div>
        </div>
        <div
          class="row"
          style={{ backgroundColor: "#E9FFE9", paddingTop: "1em" }}
        >
          <div class="col-sm-5">
            <Img
              src={require("../images/carpool.png")}
              width="700"
              fluid
              style={{ maxWidth: "100%", height: "auto", marginTop: "2em" }}
            />
          </div>
          <div class="col-sm-7">
            <p style={{ width: "80%", textAlign: "left" }}>
              RideShare aims to help a traveller in finding someone who is
              driving to the same destination point with empty seats in their
              vehicle. Also, using this web application, anyone driving their
              personal vehicle can offer a ride to other people going to the
              same destination.{" "}
            </p>
            <p style={{ width: "80%", textAlign: "left" }}>
              Depending on their goals, users will be able to use this
              application for paring down the cost of their travelling, finding
              a travelling partner and contributing towards ecological
              sustainability. The cost of travelling can be pared down for the
              carpool giver as well as the ride seeker as the carpool giver can
              charge the ride seeker for less than the cost of public
              transportation or cab.
            </p>

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

export default AboutUs;
