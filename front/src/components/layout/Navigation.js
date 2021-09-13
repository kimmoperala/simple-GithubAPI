import { Link } from "react-router-dom";

import classes from "./Navigation.module.css";

function Navigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Ohjelma</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Koti</Link>
          </li>
          <li>
            <Link to="/viestit">Viestit</Link>
          </li>
          <li>
            <Link to="/kalenteri">Kalenteri</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
