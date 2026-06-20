import React, { Component } from "react";
import "./index.css";
import Header from "../header/header";
import Cookies from "js-cookie";

class Referrals extends Component {
  state = {
    referralData: null,
    isLoading: true,
  };

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.getReferralData(id);
  }

  getReferralData = async (id) => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      const found = fetchedData.data.referrals.find(
        (each) => each.id === parseInt(id)
      );
      this.setState({ referralData: found || null, isLoading: false });
    } else {
      this.setState({ isLoading: false });
    }
  };

  getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  getBack =  ()=>{
    const {history} = this.props;
    history.push("/");
  }
  render() {
    const { referralData, isLoading } = this.state;

    if (isLoading) {
      return (
        <>
          <Header />
          <p className="loading">Loading...</p>
        </>
      );
    }

    if (!referralData) {
      return (
        <>
          <Header />
          <p className="nodata">No referral data found</p>
        </>
      );
    }

    return (
      <>
        <Header />
        <div className="referral-details-con">
          <button
            className="back-btn"
            onClick={this.getBack}
          >
            ← Back to dashboard
          </button>

          <h1 className="refhead">Referral Details</h1>
          <p className="refpara">Full information for this referral partner.</p>

          <div className="referral-details-card">
            <div className="card-header-row">
              <h2 className="card-name">{referralData.name}</h2>
              <div className="avatar">
                {this.getInitials(referralData.name)}
              </div>
            </div>

            <div className="divider" />

            <div className="detail-row">
              <p className="detail-label">Referral ID</p>
              <p className="detail-value">{referralData.id}</p>
            </div>
            <div className="detail-row">
              <p className="detail-label">Name</p>
              <p className="detail-value">{referralData.name}</p>
            </div>
            <div className="detail-row">
              <p className="detail-label">Service Name</p>
              <p className="detail-value">{referralData.serviceName}</p>
            </div>
            <div className="detail-row">
              <p className="detail-label">Date</p>
              <p className="detail-value">
                {referralData.date.replace(/-/g, "/")}
              </p>
            </div>
            <div className="detail-row">
              <p className="detail-label">Profit</p>
              <p className="detail-value">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(referralData.profit)}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Referrals;