import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class FormJourneyDetails extends Component {
  carList = { 1: "Budget car", 2: "Family Car", 3: "Sedan" };

  continue = (e) => {
    e.preventDefault();
    if (this.inputValidation()) {
      this.props.nextStep();
    }
  };

  previous = (e) => {
    e.preventDefault();
    this.props.previousStep();
  };

  inputValidation = () => {
    const { sourceLocation, destinationLocation, distance } = this.props.values;

    const regName = /^[a-zA-Z ]{2,30}$/;

    if (!regName.test(String(sourceLocation))) {
      alert("Invalid source location");
      return false;
    }
    if (!regName.test(String(destinationLocation))) {
      alert("Invalid destination location");
      return false;
    }
    if (isNaN(distance)) {
      alert("Please enter valid number as distance");
      return false;
    }

    return true;
  };

  state = { anchorEl: null };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  setCarType = (event) => {
    this.props.changeHandler("carType");
    this.setState({ anchorEl: null });
    console.log(event.target.value);
  };

  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <TextField
            hintText="Enter your Source Location"
            floatingLabelText="Source Location"
            onChange={this.props.changeHandler("sourceLocation")}
            defaultValue={this.props.values.sourceLocation}
          />
          <br />
          <TextField
            hintText="Enter your Final Destination"
            floatingLabelText="Destination Location"
            onChange={this.props.changeHandler("destinationLocation")}
            defaultValue={this.props.values.destinationLocation}
          />
          <br />

          <TextField
            hintText="Enter journey distance"
            floatingLabelText="Distance in KM"
            onChange={this.props.changeHandler("distance")}
            defaultValue={this.props.values.distance}
          />
          <br />
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              Car Type: {this.carList[this.props.values["carType"]]}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={this.state["anchorEl"]}
              keepMounted
              open={Boolean(this.state["anchorEl"])}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.props.changeHandler("carType")} value={1}>
                Budget car
              </MenuItem>
              <MenuItem onClick={this.props.changeHandler("carType")} value={2}>
                Family car
              </MenuItem>
              <MenuItem onClick={this.props.changeHandler("carType")} value={3}>
                Sedan
              </MenuItem>
            </Menu>
          </div>
          <br />
          <RaisedButton
            label="Continue"
            primary={true}
            onClick={this.continue}
            style={styles.button}
          />
          {/*<RaisedButton*/}
          {/*    label="Previous"*/}
          {/*    primary={false}*/}
          {/*    onClick={this.previous}*/}
          {/*    style={styles.button}*/}
          {/*/>*/}
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

export default FormJourneyDetails;
