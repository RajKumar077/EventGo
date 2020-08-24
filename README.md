# RideShare

The RideShare web application is a platform to connect various travellers or tourists travelling from a common point of origin to the same destination. Users can post their travelling plans through this application, and interested users can join their trip. 

* ### Create Event 
	1) User have to Login to access this screen.
	2) This screen consists of two sections, create event form component and history of events component.
	3) Currently supported events-> car journey.
	4) Event type, From and To fields are mandatory.
	5) Users can upload images (atmost 2) and can clear(delete) uploaded images.
	6) Images are uploaded to the Google Firebase
	7) Once the event is created, it is shown in the history of events component.
	8) User can also view this event in the Notifications screen under 'Requests received for created Rides' 
	9) Created events can be edited by clicking on particular event from the history of events component.
	10) Users can also delete a particular event by clicking on 'X' on the event from the history of events component.


* ### Find Event 
	1) User have to Login to access this screen.
	2) Find event screen consists of two sections, search form component and results component.
	3) Currently supported events-> car journey.
	4) No field is manadotary, user have to provide atleast one field to search for an event.
	5) System retuns all the matched events in the results component.
	6) On click on the results, users are navigated to the 'Booking Details' Screen where users can request for a ride. 
	

* ### Search and Sort 
	1) This feature is available on Create event and Find event screens.
	2) Users can search and Sort the created events or Found results.
	3) Records can be searched by: From, TO, Seats, Price and Description. These types are selected from the dropdown.
	4) Users can provide search string that is corresponding to the type selected from the dropdown.
	5) Sorting is based on: Event added(date when event is added), From, To , Date Of Journey, Seats, Price and Description.
	
* ### Request-A-Ride
	This feature task is to record the users that are making request to join an event thorugh the find event page. The data displayed are fetched from the api and then set and send over to props for further modification. The user makes changes like how mayy people wants to join and make a request and also send a single time message to organiser. On sumit request this data will e validated and stored in the database via API call made through AXIOS library.

* ### Verify Identity 
	This feature task was quite challenging to me and hence I would like to thank my team member RajKumar for helping me. The task was to let the user upload at max two images of some kind of id proof to our database. But as we use MYSQL as back-end database the entire image in MYSQL was hard to manage so we decided to store the image on fire base and store the link to that image firebase URL into database. We created Firebase.js to access its service and upload image to firbase and fetch the URL. Validate that it is indeed an image in one of the following format jpg,jpeg and png and also confirm only 2 images are queued for upload process.

After choosing files user clicks on upload document and images URL are stored by making an PUT request to our API.

* ### Feedback Page
	By default, the website will appear with a landing page that will contain link feedback at the footer. If the user clicks on the feedback link then it will redirect to another page where the user has to provide the email id and a feedback message. The user will also get validated before hitting the submit button. Once the validated and clicks on the submit button then the user's email id and feedback message will be sent to ridesharecomp@gmail.com. Lastly, the email id and feedback will be stored in the database.


* Date Created: 19 07 2020
* Last Modification Date: 07 08 2020

## Authors

* RajKumar Reddy Gangi

### Prerequisites

* [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Express](https://expressjs.com/) - Server to connect to the React app
* [Axios](https://www.npmjs.com/package/axios) - Http interface to work with XMLHttpRequest.
* [Bootstrap](https://getbootstrap.com/) - An HTML, CSS and JS framework to build responsive web pages.
* [React Bootstrap](https://www.npmjs.com/package/react-bootstrap) - A frontend framework for React for building responsive web pages.
* [js-cookie] https://www.npmjs.com/package/js-cookie - A simple, lightweight JavaScript API for handling cookies
* [react-responsive] https://www.npmjs.com/package/react-responsive - The best supported, easiest to use react media query module.
* [Firebase] https://firebase.google.com/ - Firebase gives functionality like analytics, databases and messaging.

## Software Installation
To build this web application, Node.js was used along with Express module and React. Following are the steps for the installation of these modules:
### Node.js
Step 1) Visit the official Node.js website ( https://nodejs.org/en/download/ ).

Step 2) The latest stable version can be downloaded for Windows, Mac or Linux.

Step 3) Run the installer.

### Express
Step 1) In order to download and install Express, open the terminal or the poweshell (for VS code), and change the directory such that the present present working directory is the application's directory. For example, cd D:/Tutorial3/ReactApp .

Step 2) Now express module can be installed under the npm-module directory using the following command:
		npm install --save express
    
### React app setup
You may follow the below steps if you want to run this web application locally.

Step 1) Clone the below repository to get the application code on local machine.
		***https://github.com/JigarMakwana/CSCI5709_Tutorials_Group20.git***

#### Cofiguring bootstrap
Step 2) Run the following command to get the React-bootstrap
		***npm install react-bootstrap bootstrap***

#### Cofiguring MediaQuery
Step 3) Run the following command to get the MediaQuery
		***npm install react-responsive --save***

#### Cofiguring react router dom
Step 4) Run the following command to get the React router dom
		***npm install react-router-dom***

#### Cofiguring react date picker
Step 5) Run the following command to get the React date picker
		***npm install react-datepicker --save***
		
Step 6) Run the following command
		***npm start***


## Running the tests
Step 1) Open the web browser from desktop or mobile.

Step 2) Open the link of the deployed application provided under the deployment section in this document. Alternativly, you can run the application locally as described in the previous section.

### Test Cases Create Event
1) Input validation for the fields in the Form.
2) Inputs with various lengths.
3) Description Field with more than 100 letters.
4) Delete created event.
5) Edit Created event.
6) Image Upload/Edit and Delete.
7) Upload files with different formats other than images.

### Test Cases Find Event
1) Input validation for the fields in the Form.
2) Inputs with various lengths.
3) Description Field with more than 100 letters.
4) Give search that dont return any results.
5) remove the search results.
6) Navigate to Request screen by clicking on the search result.

### Test Cases Search and Sort
1) Search/Sort with no records.
2) Search/Sort with one record.
3) Search/Sort with multiple records.
4) Search with improper text.
5) Search with proper text.
6) remove search word after getting results.


## Deployment
**Link to the Frontend repository:** ***https://github.com/JigarMakwana/CSCI5709_Project_Group_20/tree/master/SourceCode***

**Link to the API repository:** ***https://github.com/JigarMakwana/CSCI5709_Project_API_Group20***

**Link to the deployed application:** ***https://csci5709webgroup20.herokuapp.com/***



## Sources Used
### requestMainCard.jsx
Lines 12 - 39
---------------

```
	<Accordion>
            <Card border="secondary" >
                <Card.Header style={{padding:"0"}}>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                          From <strong>{this.props.eventDetail.fromAddress}</strong> to <strong>{this.props.eventDetail.toAddress}</strong> on <strong>				{this.props.eventDetail.dateToDisplay}</strong> Seats available: <strong>{this.props.eventDetail.seats} </strong>
                            Estimated price: <strong>$ {this.props.eventDetail.estPrice} </strong>
                            Description: <strong>{this.props.eventDetail.description}</strong>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            {this.props.eventDetail.requests.map(item => <SubReqDetails
                                key={item.requestId}
                            />)}
                        </Card.Body>
                    </Accordion.Collapse>
                    <Card.Footer className="justify-content-end">
                    <Row>
                        <Col>
                            <small className="text-muted"> {this.props.eventDetail.requests.length} Requests for this event</small>
                        </Col>
                        <Col>
                            <small className="text-muted">updated 3 days ago</small>
                        </Col>
                    </Row>
                </Card.Footer>
                </Card>
            </Accordion> 

```

The code above was created by adapting the code in [React Accordian](https://react-bootstrap.github.io/components/accordion/) as shown below: 

```
<Accordion>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Click me!
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>Hello! I'm the body</Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>

```

- [How] The code in [React Accordian](https://react-bootstrap.github.io/components/accordion/) was implemented by React Bootstrap
- [Why] [React Accordian](https://react-bootstrap.github.io/components/accordion/) Code was used because to provide expand/collapse feature for the cards to show and 	hide multiple requests.
- [How] [React Accordian](https://react-bootstrap.github.io/components/accordion/) Code was modified by RajKumar



### createevent.jsx

Lines 162- 167
---------------

```
<DatePicker className="calenderpicker form-control"
   value={this.props.journeyDate}
   name="journeyDate"
   selected={this.props.journeyDate}
   onChange={this.props.handleDateChange}
   />

```

The code above was created by adapting the code in [HackerOne Inc](https://www.npmjs.com/package/react-datepicker/v/2.9.6) as shown below: 

```
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 
class Example extends React.Component {
  state = {
    startDate: new Date()
  };
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
 
  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
}

```

- [How] The code in [HackerOne Inc](https://www.npmjs.com/package/react-datepicker/v/2.9.6) was implemented by HackerOne Inc.
- [Why] [React Accordian](https://react-bootstrap.github.io/components/accordion/) Code was used because to provide datepicker for creating event.
- [How] [React Accordian](https://react-bootstrap.github.io/components/accordion/) Code was modified by RajKumar

### navbarheader.jsx

Lines 47- 90
---------------

```
<Navbar className="navbg">
                    <Row style={{ width: "100%" }} md={3} sm={2} xs={1}>
                        <Col lg={1}>
                            <Navbar.Brand href="home">
                                <img src={logo} alt="logo" style={{ height: "35px" }} />
                                <strong style={{ fontFamily: "unset", fontSize: "medium" }}>EventGo</strong>
                            </Navbar.Brand>
                        </Col>
                        <Col lg={7} >
                            <Nav className="mr-auto" variant="pills" >
                        
                                {/* <NavLink href="home" style={{color:"white"}} activeClassName="active">Home</NavLink> */}
                                <NavLink exact activeClassName="nav-link active" className="nav-link" to="/home" style={{ color: "white" }}>
                                    Home
                        </NavLink>
                                <NavLink exact activeClassName="nav-link active" className="nav-link" to="/createevent" style={{ color: "white" }}>
                                    CreateEvent
                        </NavLink>
                                <NavLink exact activeClassName="nav-link active" className="nav-link" to="/findevent" style={{ color: "white" }}>
                                    FindEvent
                        </NavLink>
                                {/* <Nav.Link href="createevent" style={{ color: "white" }}>CreateEvent</Nav.Link>
                        <Nav.Link href="findevent" style={{ color: "white" }}>FindEvent</Nav.Link> */}
                        
                            </Nav>
                        </Col>
                        
                        
                        
                        {/* className="justify-content-lg-end" */}
                        
                        <Col lg={2}  >
                            <Navbar.Text >
                                {signinText}
                            </Navbar.Text>
                        </Col>
                        <Col lg={2} >
                            <Button variant="primary" type="submit" onClick={this.onButtonClick} style={{ backgroundColor: "transparent" }}>
                                {buttonText}
                            </Button>
                        </Col>
                    </Row>
                            
                </Navbar>

```

The code above was created by adapting the code in [React bootstrap](https://react-bootstrap.github.io/components/navbar/) as shown below: 

```
 <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
  </Navbar>

```

- [How] The code in [React bootstrap](https://react-bootstrap.github.io/components/navbar/) was implemented by React Bootstrap.
- [Why] [React bootstrap](https://react-bootstrap.github.io/components/navbar/) Code was used because to provide Navbar for the application with various links.
- [How] [React bootstrap](https://react-bootstrap.github.io/components/navbar/) Code was modified by RajKumar

### feedback.jsx

*Lines 58- 62*

```
    emailjs.sendForm('gmail', 'rideshare', event.target, 'user_SZchUn5ka0898AwI2Yq1S')
        .then((result) => {
        }, (error) => {
            console.log(error.text);
        });


```

The code above was created by adapting the code in [Stackoverflow](https://stackoverflow.com/questions/55795125/how-to-send-email-from-my-react-web-application) as shown below: 

```
import React from 'react';
import emailjs from 'emailjs-com';

export default function ContactUs() {
function sendEmail(e) {
  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
.then((result) => {
 window.location.reload()
}, (error) => {
 console.log(error.text);
  });
}

 return (
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <label>Name</label>
      <input type="text" name="from_name" />
      <label>Email</label>
      <input type="email" name="from_email" />
      <label>Subject</label>
      <input type="text" name="subject" />
      <label>Message</label>
      <textarea name="html_message" />
      <input type="submit" value="Send" />
    </form>
  );
}

```

- [feedback.jsx]The code in [feedback.jsx] was implemented by Smit Panchal. 
- [feedback.jsx] The code was used because I want to send users email id and feedback to our official RideShare email address and using emailjs it was much easier and code complexity was less.
- [feedback.jsx] The code was modified to send the email to RideShare email address.

## Acknowledgments

* Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
* React-bootstrap.github.io, 2020. [Online]. Available: https://react-bootstrap.github.io/components/navbar/. [Accessed: 14- Jun- 2020].
* "react-datepicker", npm, 2020. [Online]. Available: https://www.npmjs.com/package/react-datepicker/v/2.9.6. [Accessed: 14- Jun- 2020].
* React-bootstrap.github.io, 2020. [Online]. Available: https://react-bootstrap.github.io/components/accordion/. [Accessed: 14- Jun- 2020].
* H. application, R. Rajan, P. SAI and R. Malviya, "How to send email from my react web application", Stack Overflow, 2020. [Online]. Available: 	https://stackoverflow.com/questions/55795125/how-to-send-email-from-my-react-web-application. [Accessed: 25- Jul- 2020].
* A2FooterFb.png, listimg.pinclipart , 
https://listimg.pinclipart.com/picdir/s/2-21918_download-transparent-background-facebook-logo-clipart-facebook-logo.png,
[July 14, 2020]
* A2FooterTwitter.png, hiclipart, https://www.hiclipart.com/free-transparent-background-png-clipart-qimav ,[July 14, 2020]
* A2FooterInsta.png, hiclipart, https://p7.hiclipart.com/preview/462/874/418/5bbf4add2c4b8.jpg [July 14, 2020]
