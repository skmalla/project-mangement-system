import React, { Component } from "react";
import axios from "axios";

class Client extends Component {
  constructor() {
    super();
    this.state = {
      emplist: [],
      amountlist: [],
      totalamount: 0,
      pname: "",
      projectlist: [],
    };
  }

  getData = (pname) => {
    this.setState({
      pname: pname,
    });
    this.getemplist();
    this.getAmount();
  };

  getemplist = () => {
    var url = "https://www.firstenquiry.com/api/react/pms/emplist.php";
    let input = new FormData();
    input.append("pname", this.state.pname);
    axios.post(url).then((response) => {
      this.setState({
        emplist: response.data,
      });
    });
  };

  getAmount = () => {
    var url = "https://www.firstenquiry.com/api/react/pms/amountlist.php";
    let input = new FormData();
    input.append("pname", this.state.pname);
    axios.post(url, input).then((response) => {
      this.setState({
        amountlist: response.data,
      });
      this.calculatePrice(); // call here to calculate total paid amount
    });
  };

  calculatePrice = () => {
    var total = 0;
    for (var i = 0; i < this.state.amountlist.length; i++) {
      total = total + parseInt(this.state.amountlist[i].amount);
    }
    this.setState({
      totalamount: total,
    });
  };

  getProject = () => {
    var url = "https://www.firstenquiry.com/api/react/pms/allproject.php";
    axios.get(url).then((response) => {
      this.setState({
        projectlist: response.data,
      });
    });
  };

  logout = () => {
    sessionStorage.clear();
    window.location.reload();
  };
  componentDidMount() {
    this.getProject();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <ul className="list-group">
              <li className="list-group-item active">My Projects</li>
              {this.state.projectlist.map((project, index) => {
                return (
                  <li className="list-group-item">
                    <a
                      href="javascript:void(0)"
                      onClick={this.getData.bind(project.projectname)}
                    >
                      {project.projectname}
                    </a>
                  </li>
                );
              })}
              <li className="list-group-item">
                <p>
                  Welcome {sessionStorage.getItem("username")} <hr />
                  <a href="javascript:void(0)" onClick={this.logout}>
                    Logout
                  </a>
                </p>
              </li>
            </ul>
          </div>
          <div className="col-md-9">
            <h3 className="text-center text-warning">The Working Resources </h3>
            <table className="table table-bordered table-sm rounded">
              <thead className="text-danger">
                <tr>
                  <th>Emp Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Project Name</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {this.state.emplist.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td>{row.empname}</td>
                      <td>{row.mobile}</td>
                      <td>{row.email}</td>
                      <td>{row.projectname}</td>
                      <td>{row.empdetails}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <h3 className="text-center text-success">The Paid Amount </h3>
            <table className="table table-bordered table-sm rounded">
              <thead className="text-danger">
                <tr>
                  <th>Bill Number</th>
                  <th>Amount</th>
                  <th>PaymentDate</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.amountlist.map((row, index) => {
                  return (
                    <tr>
                      <td>{row.ordersid}</td>
                      <td>{row.amount}</td>
                      <td>{row.paydate}</td>
                      <td>{row.status}</td>
                    </tr>
                  );
                })}
                <tr className="bg-info">
                  <td></td>
                  <td className="text-white">
                    Total Paid Amount : {this.state.totalamount}
                  </td>
                  <td colspan="2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default Client;
