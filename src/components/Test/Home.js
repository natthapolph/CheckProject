import React, { Component } from "react";
// import './Home.css'

export class Home extends Component {
  render() {
    return (
      <div className="Body-home">
        <div className="unit">
          <h2>Home Component</h2>
        </div>
        <div className="dropdown">
          <div className="dropbtn">+</div>
          <div className="dropdown-content">
            <a href="">New Experiment</a>
            <a href="/plot">New Plot</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
