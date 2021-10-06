import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./Navigation.module.css";

function Navigation() {
  const numbers = useSelector((numbers) => numbers);

  return (
    <header className={classes.header}>
      {/*
      <div className={classes.logo}>Ohjelma</div>
*/}
      <nav>
        <ul>
          {/*<li>
            <Link to="/">Koti</Link>
          </li>
          <li>
            <Link to="/viestit">Viestit</Link>
          </li>
          <li>
            <Link to="/kalenteri">Kalenteri</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>*/}
          <li>
            <Link to="/github">Github</Link>
          </li>
          {/*
          <li>
            <div>{numbers}</div>
          </li>*/}
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
