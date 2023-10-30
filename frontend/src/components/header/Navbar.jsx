import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar({ toggle, setToggle }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <nav
        className="navbar"
        style={{ clipPath: toggle && "polygon(0 0, 100% 0,100% 100%,0 100%)" }}
      >
        <ul className="navLinks">
          <Link
            to="/"
            onClick={() => setToggle((prev) => !prev)}
            className="navLink"
          >
            <i className="bi bi-house"></i> Home
          </Link>
          <Link
            to="/posts"
            onClick={() => setToggle((prev) => !prev)}
            className="navLink"
          >
            <i className="bi bi-stickies"></i> Posts
          </Link>
          {user && (
            <Link
              to="/posts/create-post"
              onClick={() => setToggle((prev) => !prev)}
              className="navLink"
            >
              <i className="bi bi-journal-plus"></i> Create
            </Link>
          )}
          {user?.isAdmin && (
            <Link
              to="/admin-dashboard"
              onClick={() => setToggle((prev) => !prev)}
              className="navLink"
            >
              <i className="bi bi-person-check"></i> Admin Dachboard
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
}
