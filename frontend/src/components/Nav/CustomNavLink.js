import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import style from "./Nav.module.css";

export default function CustomNavLink({
  svg,
  path,
  summary = false,
  summaryValue,
}) {
  const location = useLocation();
  const [badgeShown, setBadgeShown] = useState(false);

  const hidebadge = location.pathname === path;
  if (location.pathname === path) {
    if (!badgeShown) {
      setBadgeShown(true);
    }
  }
  return (
    <>
      <NavLink
        className={({ isActive, isPending }) =>
          isActive
            ? ` ${style.navListItem} ${style.navListItemActive}`
            : `${style.navListItem}`
        }
        to={path}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          className={`fill-white ${style.svg}`}
        >
          {svg}
        </svg>
        {summary && !hidebadge && summaryValue !== null && !badgeShown && (
          <>
            <span className={style.badge}>{summaryValue}</span>
          </>
        )}
      </NavLink>
    </>
  );
}
