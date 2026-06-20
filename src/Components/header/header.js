import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

class Header extends Component {
  logOut = () => {
    const { history } = this.props;
    Cookies.remove("jwt_token");
    history.replace("/login");
  };

  render() {
    return (
      <nav className="flexNav">
        <Link to="/home" className="logo-link">
          <h1 className="loginhead" aria-label="Go to dashboard home">Go Business</h1>
        </Link>
        <div className="flexContainer">
          <button className="butn">Try for free</button>
          <button className="outline" onClick={this.logOut}>Log out</button>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);