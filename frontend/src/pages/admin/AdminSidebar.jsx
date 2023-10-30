import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="AdminSidebar">
      <Link to="/admin-dashboard" className="AdminSidebarTitle">
        <i className="bi bi-columns"></i>
        Dashboard
      </Link>
      <ul className="AdminSidebarList">
        <Link className="AdminSidebarLink" to="/admin-dashboard/users-table">
          <i className="bi bi-person"></i>
          Users
        </Link>
        <Link className="AdminSidebarLink" to="/admin-dashboard/posts-table">
          <i className="bi bi-file-post"></i>
          Posts
        </Link>
        <Link
          className="AdminSidebarLink"
          to="/admin-dashboard/categories-table"
        >
          <i className="bi bi-tag-fill"></i>
          Categories
        </Link>
        <Link className="AdminSidebarLink" to="/admin-dashboard/comments-table">
          <i className="bi bi-chat-left-text"></i>
          Comments
        </Link>
      </ul>
    </div>
  );
}
