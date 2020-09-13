import React, { Component } from "react";
import axios from "axios";
class Project extends Component {
  constructor() {
    super();
    this.state = {
      fileds: {},
      errors: {},
      msg: "",
      projectlist: [],
    };
    this.save = this.save.bind(this);
    this.formCheck = this.formCheck.bind(this);
  }

  getProject = () => {
    var url = "https://www.firstenquiry.com/api/react/pms/allproject.php";
    axios.get(url).then((response) => {
      this.setState({
        projectlist: response.data,
      });
    });
  };

  componentDidMount() {
    this.getProject(); // to call after render function
  }

  save = () => {
    if (this.formCheck()) {
      var url = "https://www.firstenquiry.com/api/react/pms/saveproject.php";
      let input = new FormData();
      input.append("cname", this.state.fileds["cname"]);
      input.append("pname", this.state.fileds["pname"]);
      input.append("mobile", this.state.fileds["mob"]);
      input.append("email", this.state.fileds["email"]);
      input.append("pdetails", this.state.fileds["pdetails"]);
      axios.post(url, input).then((response) => {
        //after sending data to the server
        let fileds = {};
        fileds["cname"] = "";
        fileds["mob"] = "";
        fileds["email"] = "";
        fileds["pname"] = "";
        fileds["pdetails"] = "";
        this.setState({
          fileds: fileds,
          msg: response.data.status,
        });
        this.getProject(); // to reload the available project
      });
    }
  };
  formCheck = () => {
    let fileds = this.state.fileds;
    let errors = {};
    let formStatus = true;
    if (!fileds["cname"]) {
      formStatus = false;
      errors["cname"] = "please enter client's name!";
      // alert("enter your name");
    }
    if (!fileds["mob"]) {
      formStatus = false;
      errors["mob"] = "please enter client's mobile no!";
    }

    let mpatten = /^[0-9]{10}$/;
    if (fileds["mob"] !== undefined) {
      if (!fileds["mob"].match(mpatten)) {
        formStatus = false;
        errors["mob"] = "please enter valid mobile no!";
      }
    }
    if (!fileds["email"]) {
      formStatus = false;
      errors["email"] = "please enter client's email-id!";
    }

    let emailpatten = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (fileds["email"] !== undefined) {
      if (!emailpatten.test(fileds["email"])) {
        formStatus = false;
        errors["email"] = "please enter valid email-id!";
      }
    }
    if (!fileds["pname"]) {
      formStatus = false;
      errors["pname"] = "please enter the project name!";
    }
    if (!fileds["pdetails"]) {
      formStatus = false;
      errors["pdetails"] = "please enter the project details!";
    }
    this.setState({
      errors: errors,
    });
    return formStatus;
  };
  handleInput = (e) => {
    let fileds = this.state.fileds;
    fileds[e.target.name] = e.target.value;
    this.setState({
      fileds,
    });
  };
  render() {
    return (
      <div className="row ">
        <div className="col-md-12">
          <h4 className="text-center text-danger bold">MANAGE PROJECT</h4>
          <p className="text-center text-primary">{this.state.msg}</p>
        </div>

        <div className="col-md-3">
          <div className="bordercustom p-4 mt-4">
            <div className="form-group">
              <label>Client Name</label>
              <input
                type="text"
                className="form-control"
                name="cname"
                value={this.state.fileds.cname}
                onChange={this.handleInput}
              />
              <p className="text-danger font bold mt-1">
                {this.state.errors.cname}
              </p>
            </div>
            <div className="form-group">
              <label>E-Mail</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={this.state.fileds.email}
                onChange={this.handleInput}
              />
              <p className="text-danger font bold mt-1">
                {this.state.errors.email}
              </p>
            </div>
            <div className="form-group">
              <label>Mobile</label>
              <input
                type="number"
                className="form-control"
                name="mob"
                value={this.state.fileds.mob}
                onChange={this.handleInput}
              />
              <p className="text-danger font bold mt-1">
                {this.state.errors.mob}
              </p>
            </div>
            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                className="form-control"
                name="pname"
                value={this.state.fileds.pname}
                onChange={this.handleInput}
              />
              <p className="text-danger font bold mt-1">
                {this.state.errors.pname}
              </p>
            </div>
            <div className="form-group">
              <label>Project Details</label>
              <textarea
                className="form-control"
                name="pdetails"
                value={this.state.fileds.pdetails}
                onChange={this.handleInput}
              ></textarea>
              <p className="text-danger font bold mt-1">
                {this.state.errors.pdetails}
              </p>
            </div>
            <button
              class="btn btn-info btn-sm btn-block mt-4 b"
              onClick={this.save}
            >
              Save Project
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <table className="table bordercustom1 table-sm mt-4">
            <thead className="text-dark bg-secondary text-center">
              <tr className="bordercustom1">
                <th className="bordercustom1 bold">CLIENT NAME</th>
                <th className="bordercustom1 bold">CONTACT INFO</th>
                <th className="bordercustom1 bold">EMAIL ID</th>
                <th className="bordercustom1 bold">PROJECT NAME</th>
                <th className="bordercustom1 bold">DETAILS</th>
                <th className="bordercustom1 bold">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {this.state.projectlist.map((row, index) => {
                return (
                  <tr key={index} className="bordercustom1">
                    <td className="bordercustom1">{row.client}</td>
                    <td className="bordercustom1">{row.mobile}</td>
                    <td className="bordercustom1">{row.email}</td>
                    <td className="bordercustom1">{row.projectname}</td>
                    <td className="bordercustom1">{row.projectdetails}</td>
                    <td className="bordercustom1">{row.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Project;
