import React from "react";
import "./App.css";
import Client from "./CLIENTFOLDER/Client";
import Company from "./COMPANYFOLDER/Company";

function App() {
  if (sessionStorage.getItem("usertype") === "CLIENT") {
    return <Client />;
  }

  if (sessionStorage.getItem("usertype") === "EMP") {
    return <Company />;
  }
}

export default App;
