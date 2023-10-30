import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css";

export default function NotFound() {
  return (
    <section className="NotFound">
      <div className="NotFoundTitle">404</div>
      <h1 className="NotFoundText">Page Not Found</h1>
      <Link to="/" className="NotFoundLink">
        Go to home page
      </Link>
    </section>
  );
}
