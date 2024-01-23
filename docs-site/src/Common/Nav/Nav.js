import React from "react";
import logo from "./logo512.png";
import style from "./style/Nav.module.css";
import { Link, NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <nav class={`${style.nav} navbar navbar-expand-lg navbar-light bg-light`}>
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="sociiity logo" className={style.navLogo} />
          <span>Sociiity</span>
        </Link>
        <button
          class="navbar-toggler py-2 bg-dark text-light btn btn-dark"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Help
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <NavLink
                to="/community-guidelines"
                className={({ isActive, isPending }) =>
                  isActive
                    ? "nav-link navItem navItemActive"
                    : "nav-link navItem"
                }
              >
                Community Guidelines
              </NavLink>
            </li>
            <li class="nav-item active">
              <NavLink
                to="/categories"
                className={({ isActive, isPending }) =>
                  isActive
                    ? "nav-link navItem navItemActive"
                    : "nav-link navItem"
                }
              >
                Content Categories
              </NavLink>
            </li>
            <li class="nav-item active">
              <NavLink
                to="/how-make-post"
                className={({ isActive, isPending }) =>
                  isActive
                    ? "nav-link navItem navItemActive"
                    : "nav-link navItem"
                }
              >
                How make post?
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
