import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";

class Confirm extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  previous = (e) => {
    e.preventDefault();
    this.props.previousStep();
  };

  // inputValidation =()=>{
  //     const {firstName, lastName, email} = this.props.values
  //
  //     const regName = /^[a-zA-Z ]{2,30}$/;
  //     const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //
  //     if(!regName.test(String(firstName))){
  //         alert("Invalid First Name")
  //         return false
  //     }
  //     if(!regName.test(String(lastName))){
  //         alert("Invalid Last Name")
  //         return false
  //     }
  //     if(!regEmail.test(String(email).toLowerCase())){
  //         alert("Invalid Email address")
  //         return false
  //     }
  //
  //     return true
  //
  // }
  temp = (e) => {
    this.continue(e);
    this.props.clicked();
  };
  carList = { 1: "Budget car", 2: "Family Car", 3: "Sedan" };
  render() {
    const copy = { ...this.props.values };
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <List>
            <ListItem
              primaryText="From"
              secondaryText={copy["sourceLocation"]}
            />
            <ListItem
              primaryText="To"
              secondaryText={copy["destinationLocation"]}
            />
            <ListItem primaryText="Distance" secondaryText={copy["distance"]} />
            <ListItem
              primaryText="Car Type"
              secondaryText={this.carList[copy["carType"]]}
            />
          </List>
          <br />
          <RaisedButton
            label="Get my Estimate"
            primary={true}
            onClick={this.temp}
            style={styles.button}
          />
          <RaisedButton
            label="Previous"
            primary={false}
            onClick={this.previous}
            style={styles.button}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15,
  },
};

export default Confirm;
