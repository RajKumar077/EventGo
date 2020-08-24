import React, { Component } from "react";
import Success from "../Success/Success";
import FormJourneyDetails from "../FormJourneyDetails/FormJourneyDetails";
import FormUsersDetails from "../FormUsersDetails/FormUsersDetails";
import Confirm from "../Confirm/Confirm";

class CostEstimator extends Component {
  state = {
    step: 1,
    // firstName:'',
    // lastName:'',
    // email:'',
    sourceLocation: "",
    destinationLocation: "",
    distance: "",
    carType: "1",
    price: 0,
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  previousStep = () => {
    const { step } = this.state;
    if (step !== 1) {
      this.setState({
        step: step - 1,
      });
    }
  };

  fieldChangeHandler = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  distanceGenerator = () => {
    let { distance, carType } = this.state;
    let prices = (distance * carType * 5) / 1.5;
    this.setState((prevState) => (prevState["price"] = prices));
  };
  render() {
    const copyState = { ...this.state };
    switch (copyState["step"]) {
      // case 1:
      //     return(
      //         <FormUsersDetails nextStep={this.nextStep} changeHandler={this.fieldChangeHandler} values={copyState}/>
      //     )

      case 1:
        return (
          <FormJourneyDetails
            nextStep={this.nextStep}
            changeHandler={this.fieldChangeHandler}
            values={copyState}
            previousStep={this.previousStep}
          />
        );

      case 2:
        return (
          <Confirm
            nextStep={this.nextStep}
            changeHandler={this.fieldChangeHandler}
            values={copyState}
            previousStep={this.previousStep}
            clicked={this.distanceGenerator}
          />
        );

      case 3:
        return <Success values={copyState} previousStep={this.previousStep} />;
    }
  }
}

export default CostEstimator;
