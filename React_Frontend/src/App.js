import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Component from "./costestimator/costestimator";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Working</h1>
        <Switch>
          <Route path="/costestimator" exact>
            <Component />
          </Route>

          <Route path="/password" exact>
            <Component />
          </Route>

          <Route path="/profile" exact>
            <Component />
          </Route>

          <Route path="/static" exact>
            <Component />
          </Route>

          <Route path="/Raj" exact>
            <Component />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
