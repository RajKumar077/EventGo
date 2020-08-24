//@Author - RajKumar B00849566

import React from 'react';
import { Row,Col,Container } from "react-bootstrap";
 
function ErrorPage() {
  const greeting = 'Hello Function Component!';
 
    return (
        <div style={{paddingTop:"10%"}}>
            <Container>
                <Row className="justify-content-center align-items-center">
                    <h1 style={{color:"#013b75"}}>404</h1>
                </Row>
                <Row className="justify-content-center align-items-center">
                <span style={{color:"#013b75"}}>The page you are looking for doesn't exist on the server</span>
                </Row>
                <Row className="justify-content-center align-items-center">
                    <span style={{color:"#013b75"}}>Please select items from the navbar</span>
                </Row>
                </Container>
        </div>
        
        
    );
}
 
export default ErrorPage;