//@Author - RajKumar B00849566

import React, { Component } from 'react';
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import logo from '../images/logo.png'

class Description extends Component {
    state = {  }
    render() {
        const myStyle = {
            fontFamily: "cursive"

        }
        const myStyleSpan = {
            color: "#035fbb"

        }
        const myBordeSrtyle = {
            width: "100%",
            height:"100%",
            backgroundColor: "#c3c6d8",
            borderRadius:"7px"

        }
        return (<div style={{"height":"100%"}}>
            <br />
            <Col style={{"height":"100%"}}>
            <Container style={myBordeSrtyle}>

                    <h2>Why RideShare</h2>

                <br/>
                <Row>
                    <Col lg="1">
                        <img src={logo} alt="logo" style={{ height: "35px" }} />
                    </Col>
                    <Col>
                        <h6 style={myStyle}><span style={myStyleSpan}>RideShare</span> is a platform to connect various travellers or tourists travelling from a
common point of origin to the same destination</h6>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col lg="1">
                        <img src={logo} alt="logo" style={{ height: "35px" }} />
                    </Col>
                    <Col>
                        <h6 style={myStyle}><span style={myStyleSpan}>Long distance travelling</span> Post and Request any kind of event anywhere across the globe  </h6>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col lg="1">
                        <img src={logo} alt="logo" style={{ height: "35px" }} />
                    </Col>
                    <Col>
                        <h6 style={myStyle}><span style={myStyleSpan}>Signup for free</span> Event Creators and Event Requestor don't pay any registration fee or membership fee </h6>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col lg="1">
                        <img src={logo} alt="logo" style={{ height: "35px" }} />
                    </Col>
                    <Col>
                        <h6 style={myStyle}><span style={myStyleSpan}>Make Connections</span> Sharing travelling plans is a great way to make new friends </h6>
                    </Col>
                </Row>
                </Container>
                </Col>
        </div>);
    }
}

export default Description;
