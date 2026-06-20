import { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class NotFound extends Component {
  render() {
    return (

        <div className="flexContainerNot">
          <h1 className="head">404</h1>
          <p className="page">page not found</p>
          <Link to="/" className="navi">
           Back to Dashboard
          </Link>
        </div>
    );
  }
}

export default NotFound;
