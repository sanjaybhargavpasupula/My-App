import { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class Footer extends Component {
  render() {
    return (
      <nav className="flexNavfoo" aria-label="Footer">
        <h1 className="loginheadfoo">Go Business</h1>
        <ul className="flexContainerfoo">
          <Link to="/about" className="linkfoo">
            <li className="list">About</li>
          </Link>
          <Link to="/contact" className="linkfoo">
            <li className="list">Contact</li>
          </Link>
          <Link to="/privacy" className="linkfoo">
            <li className="list">Privacy</li>
          </Link>
          <Link to="/terms" className="linkfoo">
            <li className="list">Terms</li>
          </Link>
        </ul>
        <li className="list">© 2024 Go Business, Inc.</li>
      </nav>
    );
  }
}

export default Footer;
