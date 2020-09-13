import React, { Component } from "react";
import axios from "axios";
class Billing extends Component {
  constructor() {
    super();
    this.state = {
      projectlist: [],
      pname: "",
      newamount: "",
      msg: "",
      amountlist: [],
      totalamount: 0,
    };
  }

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
  componentDidMount() {
    this.getProject(); // to call after render function
  }
  handlePname = (event) => {
    this.setState({
      pname: event.target.value,
    });
  };

  handleAmount = (event) => {
    this.setState({
      newamount: event.target.value,
    });
  };

  getAllAmount = () => {
    alert(this.state.pname);
  };

  saveAmount = () => {
    var url = "https://www.firstenquiry.com/api/react/pms/saveamount.php";
    let input = new FormData();
    input.append("pname", this.state.pname);
    input.append("amount", this.state.newamount);
    axios.post(url, input).then((response) => {
      this.setState({
        msg: response.data.status,
        newamount: "",
      });
      this.getAmount(); // to fetch paid amount a select project
    });
  };
  render() {
    return (
      <div className="container">
        <h2 className="text-center text-danger p-3">Project & Billing</h2>
        <p className="text-center text-success">{this.state.msg}</p>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <select
                className="form-control"
                name="pname"
                onChange={this.handlePname}
              >
                <option>Choose Project Name</option>
                {this.state.projectlist.map((row, index) => {
                  return (
                    <option value={row.projectname}>{row.projectname}</option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Amount"
                value={this.state.newamount}
                onChange={this.handleAmount}
              />
            </div>
          </div>
          <div className="col-md-4">
            <button class="btn btn-info btn-sm" onClick={this.saveAmount}>
              Save Payment
            </button>
            <button class="btn btn-success btn-sm" onClick={this.getAmount}>
              Show Payment
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center">
              Paid Amount is : {this.state.amountlist.length}{" "}
            </h3>
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
export default Billing;
