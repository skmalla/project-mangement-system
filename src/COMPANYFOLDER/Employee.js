import React, { Component } from "react";
import axios from "axios";
class Employee extends Component {
  constructor() {
    super();
    this.state = {
      fileds: {},
      errors: {},
      msg: "",
      projectlist: [],
      emplist: [],
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

  getemplist = () => {
    var url = "https://www.firstenquiry.com/api/react/pms/emplist.php";
    axios.get(url).then((response) => {
      this.setState({
        emplist: response.data,
      });
    });
  };

  componentDidMount() {
    this.getProject(); // to call after render function
    this.getemplist();
  }

  save = () => {
    if (this.formCheck()) {
      var url = "https://www.firstenquiry.com/api/react/pms/saveemp.php";
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
        this.getemplist(); // to reload the available project
      });
    }
  };
  formCheck = () => {
    let fileds = this.state.fileds;
    let errors = {};
    let formStatus = true;
    if (!fileds["cname"]) {
      formStatus = false;
      errors["cname"] = "please enter employee's name!";
    }
    if (!fileds["mob"]) {
      formStatus = false;
      errors["mob"] = "please enter employee's mobile no!";
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
      errors["email"] = "please enter employee's email-id!";
    }

    let emailpatten = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (fileds["email"] != undefined) {
      if (!emailpatten.test(fileds["email"])) {
        formStatus = false;
        errors["email"] = "please enter valid email-id!";
      }
    }
    /*  if (!fileds["pname"]) {
      formStatus = false;
      errors["pname"] = "please enter the project name!";
    }*/
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
      <div className="row">
        <div className="col-md-12">
          <h4 className="text-center text-danger bold">MANAGE EMPLOYEE</h4>
          <p className="text-center text-primary">{this.state.msg}</p>
        </div>

        <div className="col-md-3">
          <div className="bordercustom p-4 mt-4">
            <div className="form-group">
              <label>Employee Name</label>
              <input
                type="text"
                className="form-control"
                name="cname"
                value={this.state.fileds.cname}
                onChange={this.handleInput}
              />
              <i className="text-danger">{this.state.errors.cname}</i>
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
              <i className="text-danger">{this.state.errors.email}</i>
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
              <i className="text-danger">{this.state.errors.mob}</i>
            </div>
            <div className="form-group">
              <label>Project Name</label>
              <select
                className="form-control"
                name="pname"
                onChange={this.handleInput}
              >
                {" "}
                <option>Choose</option>
                {this.state.projectlist.map((row, index) => {
                  return (
                    <option value={row.projectname}>{row.projectname}</option>
                  );
                })}
              </select>
              <i className="text-danger">{this.state.errors.pname}</i>
            </div>
            <div className="form-group">
              <label>Employee Details</label>
              <textarea
                className="form-control"
                name="pdetails"
                value={this.state.fileds.pdetails}
                onChange={this.handleInput}
              ></textarea>
              <i className="text-danger">{this.state.errors.pdetails}</i>
            </div>
            <button class="btn btn-info btn-sm btn-block b" onClick={this.save}>
              Save Employee
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <table className="table table-bordered table-sm rounded bordercustom1 mt-4">
            <thead className="text-dark  bordercustom1 bg-secondary text-center">
              <tr className="bordercustom1">
                <th className="bordercustom1 bold">EMPOLYEE NAME</th>
                <th className="bordercustom1 bold">CONTACT INFO</th>
                <th className="bordercustom1 bold">EMAIL ID</th>
                <th className="bordercustom1 bold">PROJECT NAME</th>
                <th className="bordercustom1 bold">DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {this.state.emplist.map((row, index) => {
                return (
                  <tr key={index} className="bordercustom1">
                    <td className="bordercustom1">{row.empname}</td>
                    <td className="bordercustom1">{row.mobile}</td>
                    <td className="bordercustom1">{row.email}</td>
                    <td className="bordercustom1">{row.projectname}</td>
                    <td className="bordercustom1">{row.empdetails}</td>
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
export default Employee;
