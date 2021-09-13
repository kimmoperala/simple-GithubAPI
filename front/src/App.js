import "./App.css";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import AllMessages from "./pages/AllMessages";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/kalenteri">
          <Calendar />
        </Route>
        <Route path="/viestit">
          <AllMessages />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
