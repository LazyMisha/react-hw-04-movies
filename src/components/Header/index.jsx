import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header>
      <NavLink
        className={styles.link}
        activeClassName={styles["active-link"]}
        exact
        to={"/"}
      >
        Home
      </NavLink>
      <NavLink
        className={styles.link}
        activeClassName={styles["active-link"]}
        to="/movies"
      >
        Movies
      </NavLink>
    </header>
  );
};

export default Header;
