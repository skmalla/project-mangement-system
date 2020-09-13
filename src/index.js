import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import UserLogin from "./Signin";
import registerServiceWorker from "./registerServiceWorker";

if (sessionStorage.getItem("userid") === null) {
  ReactDOM.render(<UserLogin />, document.getElementById("root"));
} else {
  ReactDOM.render(<App />, document.getElementById("root"));
}

registerServiceWorker();
