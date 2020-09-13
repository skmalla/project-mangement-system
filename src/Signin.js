import React, { Component } from "react";
import Axios from "axios";

class UserLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      pass: "",
      msg: "",
    };
  }

  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handlePass = (event) => {
    this.setState({
      pass: event.target.value,
    });
  };

  login = () => {
    if (this.state.email !== "" && this.state.pass !== "") {
      this.setState({
        msg: "Please Wait...",
      });

      var url = "https://www.firstenquiry.com/api/react/pms/auth.php";

      let input = new FormData();
      input.append("email", this.state.email);
      input.append("pass", this.state.pass);

      Axios.post(url, input).then((response) => {
        if (response.data.id === "") {
          this.setState({
            msg: "Invalid or Not Exists...!",
          });
        } else {
          this.setState({
            msg: "Login success! Redirecting....",
          });
          sessionStorage.setItem("username", response.data.name);
          sessionStorage.setItem("userid", response.data.id);
          sessionStorage.setItem("usertype", response.data.usertype);
          if (response.data.usertype === "EMP") {
            window.location.href = "/#/company";
            window.location.reload(); //to reload the current page
          } else {
            window.location.href = "../";
            window.location.reload();
          }
        }
      });
    } else {
      this.setState({
        msg: "Please Enter Login Details",
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="card" style={{ marginTop: "100px" }}>
              <div className="card-header bg-secondary text-white">Login</div>
              <div className="card-body">
                <p className="text-center text-primary">{this.state.msg}</p>
                <div className="form-group">
                  <label htmlFor="">Username</label>
                  <input
                    type="text"
                    onChange={this.handleEmail}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    onChange={this.handlePass}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="card-footer text-center">
                <button onClick={this.login} className="btn btn-danger btn-sm">
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}

export default UserLogin;
