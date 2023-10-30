import React from "react";
import { Link } from "react-router-dom";

export default function HeaderLift({ toggle, setToggle }) {
  return (
    <div>
      <div className="headerLeft">
        <Link to="/" className="headerLogo">
          <strong>BLOG</strong>
          <i className="bi bi-pencil"></i>
        </Link>
        <div onClick={() => setToggle((prev) => !prev)} className="headerMenu">
          {toggle ? (
            <i className="bi bi-x-lg"></i>
          ) : (
            <i className="bi bi-list"></i>
          )}
        </div>
      </div>
    </div>
  );
}
