import { Link } from "react-router-dom";
import classes from "./Navigation.module.css";

function Navigation() {

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link to="/github">Github</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
