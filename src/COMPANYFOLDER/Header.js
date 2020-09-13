import React from "react";
import { Link } from "react-router-dom";
import "./Company.css";
function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-color">
      <Link className="navbar-brand bold" to="/company">
        PMS
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav ml-auto ">
          <li className="nav-item">
            <Link to="/company" className="nav-link">
              <i className="fa fa-home"></i> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/company/project" className="nav-link">
              <i className="fa fa-suitcase"></i> Project
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/company/employee" className="nav-link">
              <i className="fa fa-users"></i> Employee
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/company/billing" className="nav-link">
              <i className="fa fa-print"></i> Billing
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" onClick={logout}>
              Welcome , {sessionStorage.getItem("username")} , Logout{" "}
              <i className="fa fa-power-off text-danger"></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const logout = () => {
  sessionStorage.clear(); // to clear all data from sessionStorage
  window.location.reload();
};

export default Header;
