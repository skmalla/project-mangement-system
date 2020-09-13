import React, { Component } from "react";
import axios from "axios";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      projectlist: [],
      emplist: [],
      totalBill: [],
    };
  }

  getProject = () => {
    var url = "https://www.firstenquiry.com/api/react/pms/allproject.php";
    axios.get(url).then((response) => {
      this.setState({
        projectlist: response.data,
      });
    });
  };

  getAmount = () => {
    var url = "https://www.firstenquiry.com/api/react/pms/amountlist.php";
    axios.get(url).then((response) => {
      this.setState({
        totalBill: response.data,
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
    this.getAmount();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center text-warning">Dashboard</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-2 text-center">
            <div className=" p-3">
              <i className="fa fa-suitcase fa-3x text-info"></i>
              <h5 className="text-secondary">
                Projects <br /> {this.state.projectlist.length}
              </h5>
            </div>
          </div>
          <div className="col-md-2 text-center ">
            <div className=" p-3">
              <i className="fa fa-users fa-3x text-success"></i>
              <h5 className="text-secondary">
                Employee <br /> {this.state.emplist.length}
              </h5>
            </div>
          </div>
          <div className="col-md-2 text-center">
            <div className=" p-3">
              <i className="fa fa-print fa-3x text-primary"></i>
              <h5 className="text-secondary">
                Total Billing <br />
                {this.state.totalBill.length}
              </h5>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
