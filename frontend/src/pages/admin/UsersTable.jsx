/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import "./adminTable.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfile,
  getAllUsersProfile,
} from "../../redux/apiCalls/profileApiCall";

export default function UsersTable() {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getAllUsersProfile());
  }, [isProfileDeleted]);
  const deleteUserHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(userId));
      }
    });
  };

  return (
    <section className="TableContainer">
      <AdminSidebar />
      <div className="TableWrapper">
        <h1 className="TableTitle">Users</h1>
        <table className="Table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="TableImage">
                    <img
                      src={item.profilePhoto?.url}
                      className="TableUserImage"
                      alt=""
                    />
                    <span className="TableUsername">{item.username}</span>
                  </div>
                </td>
                <td>{item.email}</td>
                <td>
                  <div className="TableButtonGroup">
                    <button>
                      <Link to={`/profile/${item._id}`}>View Profile</Link>
                    </button>
                    <button onClick={() => deleteUserHandler(item._id)}>
                      Delete User
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
