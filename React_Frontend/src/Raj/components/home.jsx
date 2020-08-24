//@Author - RajKumar B00849566
/* @Author - password Makwana B00842568 */
import React, { Component } from "react";
import RequestsReceived from "./notfications/requestsReceived";
import ResponsesReceived from "./notfications/responsesReceived";
import { Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Carousel from "react-bootstrap/Carousel";
import "../../password/Components/TestCarousels/TestCarousels.css";

class Home extends Component {
  constructor(props) {
    super(props);
    let isLoggedin = true;
    //const username = sessionStorage.getItem("username");
    const username = Cookies.get("email");
    if (username == null) {
      isLoggedin = false;
    }
    this.state = {
      isLoggedin,
    };
  }

  render() {
    if (!this.state.isLoggedin) {
      return <Redirect to="/login" />;
    }
    return (
      <Carousel>
        <Carousel.Item>
          <Container className="col-lg-5">
            <br />
            <section>
              <RequestsReceived />
            </section>
          </Container>
        </Carousel.Item>
        <Carousel.Item>
          <div>
            <Container className="col-lg-5">
              <br />
              <section>
                <ResponsesReceived />
              </section>
            </Container>
          </div>
        </Carousel.Item>
      </Carousel>
      //     <div>
      //     <Container>
      //     <br/>
      //         <Row>
      //             <Col>
      //                 <RequestsReceived />
      //             </Col>
      //             <Col>
      //                 <ResponsesReceived />
      //             </Col>
      //         </Row>
      //     </Container>
      // </div>
    );
  }
}

export default Home;
