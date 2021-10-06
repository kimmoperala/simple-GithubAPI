import "./App.css";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Github from "./pages/Github";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/github">
          <Github />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
