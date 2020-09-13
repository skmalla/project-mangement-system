import React from "react";
import "./Company.css";
import { Route, HashRouter } from "react-router-dom";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Project from "./Project";
import Employee from "./Employee";
import Billing from "./Billing";

function Company() {
  return (
    <HashRouter>
      <Header />
      <div className="container">
        <Route exact path="/company" component={Dashboard} />
        <Route path="/company/project" component={Project} />
        <Route path="/company/employee" component={Employee} />
        <Route path="/company/billing" component={Billing} />
      </div>
    </HashRouter>
  );
}

export default Company;
