import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

export default function HeaderRight() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [dropdown, SetDropdown] = useState(false);

  const logoutHandler = () => {
    SetDropdown(false);
    dispatch(logoutUser());
  };
  return (
    <>
      <dev className="headerRight">
        {user ? (
          <>
            <div className="headerRightUserInfo">
              <span
                onClick={() => SetDropdown((prev) => !prev)}
                className="headerRightUsername"
              >
                {user?.username}
              </span>
              <img
                src={user?.profilePhoto.url}
                alt=""
                className="headerRightUserPhoto"
              />
              {dropdown && (
                <div className="headerRightDropdown">
                  <Link
                    to={`/profile/${user?._id}`}
                    className="headerDropdownItem"
                    onClick={() => SetDropdown(false)}
                  >
                    <i className="bi bi-file-person"></i>
                    <span>Profile</span>
                  </Link>
                  <div onClick={logoutHandler} className="headerDropdownItem">
                    <i className="bi bi-box-arrow-in-left"></i>
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="headerRightLink">
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Login</span>
            </Link>
            <Link to="register" className="headerRightLink">
              <i className="bi bi-person-plus"></i>
              <span>Register</span>
            </Link>
          </>
        )}
      </dev>
    </>
  );
}
