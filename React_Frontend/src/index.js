import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from './App';
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginAndReg from "./Raj/components/loginReg";
import { FooterCus } from "./password/Components/Footer/Footer";
import { ForgotPassword } from "./password/Components/ForgotPasword/ForgotPassword";
import { ResetPassword } from "./password/Components/ResetPassword/ResetPassword";
import NavbarTemplate from "./Raj/components/navbarTemplate";
import { TestCarousels } from "./password/Components/TestCarousels/TestCarousels";

// import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginAndReg}></Route>
      <Route exact path="/forgotpassword" component={ForgotPassword}></Route>
      // <Route exact path="/resetpassword" component={ResetPassword}></Route>
      //{" "}
      <Route
        path="/resetpassword/:userId"
        render={(props) => <ResetPassword {...props} />}
      />
      <Route
        path="/resetpassword"
        render={({ match }) => <ResetPassword userId={match.params.userId} />}
      />
      <Route exact path="/carousel" component={TestCarousels}></Route>
      <Route component={NavbarTemplate} />
    </Switch>
    <FooterCus />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
