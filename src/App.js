import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./Components/login/login";
import ProtectedRoute from "./Components/protectedroute/protectedroute";
import Home from "./Components/home/home";
import Referrals from "./Components/referral/referral";
import NotFound from "./Components/notfound/notfound";


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/referral/:id" component={Referrals} />
      <Redirect exact from="/dashboard/referrals" to="/" />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
);

export default App;