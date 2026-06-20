import { Component } from "react"
import Cookies from "js-cookie"
import "./index.css"
class Login extends Component {
  state = {
    email: "",
    password: "",
    showErrorMsg: "",
    isError: false,
  };

  onSubmitSuccess = jwtToken => {
  Cookies.set("jwt_token", jwtToken, { expires: 30 });

  const { history } = this.props;
  history.replace("/");
};
  getData = async event => {
  event.preventDefault();

  const { email, password } = this.state;

  if (email.trim() === "" || password.trim() === "") {
    this.setState({
      isError: true,
      showErrorMsg: "Email and Password are required",
    });
    return;
  }

  const url = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin";

  const userDetails = {
    email,
    password,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(userDetails),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  if (response.ok) {
    this.onSubmitSuccess(data.data.token);
  } else {
    this.setState({
      isError: true,
      showErrorMsg: "Invalid email or password",
    });
  }
};
 onChangeEmail = event => {
  this.setState({
    email: event.target.value,
    isError: false,
  });
};

onChangePassword = event => {
  this.setState({
    password: event.target.value,
    isError: false,
  });
};
  render(){
    const {email,password,showErrorMsg,isError} = this.state
  return (
  <div className="log-maincontainer">
    <div className="log-container">
      <h1 className="loginhead">Go Business</h1>
      <p className="loginpara">
        Sign in to open your referral dashboard.
      </p>
      <form onSubmit={this.getData}>
        <label htmlFor="email" className="loginemail">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="you@example.com"
          onChange={this.onChangeEmail}
          className="loginput"
        />
        <label htmlFor="password" className="loginpass">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="********"
          onChange={this.onChangePassword}
          className="loginput"
        />
        <button className="loginbutn" type="submit">
          Sign In
        </button>
      </form>

      {isError && (
        <p className="error-msg">{showErrorMsg}</p>
      )}
    </div>
  </div>
);
  }
}
export default Login;
