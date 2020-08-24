import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const Success = (props) => {
  const styles = {
    button: {
      margin: 15,
    },
  };
  return (
    <MuiThemeProvider>
      <React.Fragment>
        <h1>Thank you for using our cost estimator</h1>
        <p>As per our algorithm, your estimated cost is</p>
        <h2>CAD ${props.values["price"]}</h2>
        <p>If you would like to try with different values please try again.</p>
        <br />
        <RaisedButton
          label="Try again"
          primary={true}
          onClick={props.previousStep}
          style={styles.button}
        />
      </React.Fragment>
    </MuiThemeProvider>
  );
};

export default Success;
