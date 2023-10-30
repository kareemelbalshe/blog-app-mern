import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminMain from "./AdminMain";
import "./admin.css";

export default function AdminDashboard() {
  return (
    <section className="AdminDashboard">
      <AdminSidebar />
      <AdminMain />
    </section>
  );
}
