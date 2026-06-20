import { Component } from "react";
import "./index.css";
import Cookies from "js-cookie";
import Header from "../header/header";
import Footer from "../footer/footer";
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
/>;
const ICON_MAP = {
  "Total Balance": "ti-currency-dollar",
  "Discount Percentage": "ti-discount-2",
  "Total Referral": "ti-link",
  "Discount Amount": "ti-hourglass",
  "Commission Amount": "ti-percentage",
  "Total Earning": "ti-moneybag",
  "Commission Discount": "ti-receipt-2",
  "Total Bank Transfer": "ti-arrows-exchange",
};
class Home extends Component {
 state = {
  overviewList: [],
  summaryList: {
    service: "",
    yourReferrals: "",
    activeReferrals: "",
    totalRefEarnings: "",
  },
  referralList: {},
  allReferralsList: [],
  filteredList: [],        
  search: "",
  option: "Newest first",
};
  componentDidMount() {
    this.getEntireReferralsData();
  }
  getEntireReferralsData = async () => {
    const { option } = this.state;
    const sortOrder = option === "Newest first" ? "desc" : "asc";
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?sort=${sortOrder}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      const newList = fetchedData.data.metrics.map((eachItem) => ({
        id: eachItem.id,
        label: eachItem.label,
        value: eachItem.value,
        icon: ICON_MAP[eachItem.label] ?? "ti-chart-bar",
      }));
      const newSummary = fetchedData.data.serviceSummary;
      const newCodes = fetchedData.data.referral;
      const referralsList = fetchedData.data.referrals.map((each) => ({
        id: each.id,
        name: each.name,
        servicename: each.serviceName,
        date: each.date,
        profit: each.profit,
      }));

      this.setState({
        overviewList: newList,
        summaryList: newSummary,
        referralList: newCodes,
        allReferralsList: referralsList,
        filteredList: referralsList, 
      });
    } else {
      const errorData = await response.json();
      alert(`${response.status}: ${errorData.message}`);
    }
  };
  getsearchtext = (event) => {
  const search = event.target.value;
  const { allReferralsList } = this.state;

  const filteredList = allReferralsList.filter((each) =>
    each.name.toLowerCase().includes(search.toLowerCase()) ||
    each.servicename.toLowerCase().includes(search.toLowerCase())
  );

  this.setState({ search, filteredList });
};
  onChangeOption = (event) => {
    this.setState({ option: event.target.value }, () => {
      this.getEntireReferralsData();
    });
  };
onClickReferral = (id, item) => {
  localStorage.setItem("selectedReferral", JSON.stringify(item));
  const { history } = this.props;
  history.push(`/referral/${id}`);
};
  render() {
     console.log("props in render:", this.props);
    const {
      overviewList,
      summaryList,
      referralList,
      search,
      allReferralsList,
      option,
    } = this.state;
    const { service, yourReferrals, activeReferrals, totalRefEarnings } =
      summaryList;
    const { link, code } = referralList;
  const searchResults = this.state.filteredList;
const paginatedResults = searchResults.slice(0, 10);

    return (
      <>
        <div className="mainContainer">
          <Header />
          <div>
            <h1 className="refhead">Referral Dashboard</h1>
            <p className="refpara">
              Track your referrals, earnings, and partner activity in one place.
            </p>
          </div>

          <div className="overviewcon">
            <h1 className="refhead1">Overview</h1>
            <ul className="ullistover">
              {overviewList.map((item) => (
                <li className="listover" key={item.id}>
                  <div className="icon-box">
                    <i className={`ti ${item.icon}`} aria-hidden="true" />
                  </div>
                  <p>{item.value}</p>
                  <p>{item.label}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="service">
            <h1 className="refhead1ser">Service Summary</h1>
            <ul>
              <li>
                <p>SERVICE</p>
                <p className="service-link">some service</p>
              </li>
              <li>
                <p>YOUR REFERRALS</p>
                <p>{yourReferrals}</p>
              </li>
              <li>
                <p>ACTIVE REFERRALS</p>
                <p>{activeReferrals}</p>
              </li>
              <li>
                <p>TOTAL REF. EARNINGS</p>
                <p>{totalRefEarnings}</p>
              </li>
            </ul>
          </div>
          <div className="codescon">
            <h1 className="refhead1ser">Refer friends and earn more</h1>
            <div className="mainflex">
              <div className="columnflex">
                <h1 className="codehead">YOUR REFERAL LINK</h1>
                <div className="codeflex">
                  <p className="codepara">{link}</p>
                  <button className="codebutn">Copy</button>
                </div>
              </div>
              <div className="columnflex">
                <h1 className="codehead">YOUR REFERAL CODE</h1>
                <div className="codeflex">
                  <p className="codepara">{code}</p>
                  <button className="codebutn">Copy</button>
                </div>
              </div>
            </div>
          </div>
         <div className="referralcon">
  <h1 className="refhead1ser">All referrals</h1>
  <div className="tablecontrols">
    <div className="searchbox">
      <label htmlFor="search" className="searchlabel">Search</label>
      <input
        type="search"
        id="search"
        value={search}
        placeholder="Name or service..."
        onChange={this.getsearchtext}
        className="searchinput"
      />
    </div>
    <div className="sortbox">
      <label htmlFor="filter" className="sortlabel">Sort by date</label>
      <select
        id="filter"
        value={option}
        onChange={this.onChangeOption}
        className="sortselect"
      >
        <option value="Newest first">Newest first</option>
        <option value="Oldest first">Oldest first</option>
      </select>
    </div>
  </div>

  <table className="reftable">
    <thead>
      <tr>
        <th>NAME</th>
        <th>SERVICE</th>
        <th>DATE</th>
        <th>PROFIT</th>
      </tr>
    </thead>
    <tbody>
      {paginatedResults.length > 0 ? (
        paginatedResults.map((each) => (
          <tr
               key={each.id}
              onClick={() => this.onClickReferral(each.id,each)}
              className="tablerow"
          >
            <td>{each.name}</td>
            <td>{each.serviceName}</td>
            <td>{each.date.replace(/-/g, "/")}</td>
            <td className="profit-cell">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(each.profit)}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="emptyrow">No matching entries</td>
        </tr>
      )}
    </tbody>
  </table>

  <div className="pagination">
    <p className="showingtext">
      Showing 1–{paginatedResults.length} of {searchResults.length} entries
    </p>
    <div className="pagbtns">
      <button className="pagbtn" disabled>Previous</button>
      <button className="pagbtn active">1</button>
      <button className="pagbtn">Next</button>
    </div>
  </div>
</div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Home;
