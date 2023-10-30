/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getResetPassword,
  resetPassword,
} from "../../redux/apiCalls/passwordApiCall";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);
  const { userId, token } = useParams();
  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [userId, token]);
  const [password, setPassword] = useState("");

  const formSupmitHandler = (e) => {
    e.preventDefault();

    if (password.trim() === "") return toast.error("Password is required");
    dispatch(resetPassword(password, { userId, token }));
  };
  return (
    <section className="FormContainer">
      {isError ? (
        <h1>Not Found</h1>
      ) : (
        <>
          <h1 className="FormTitle">Reset Password</h1>
          <form onSubmit={formSupmitHandler} className="Form">
            <div className="FormGroup">
              <label htmlFor="password" className="FormLabel">
                New Password
              </label>
              <input
                type="password"
                name=""
                id="password"
                placeholder="Enter your new password"
                className="FormInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="FormBtn">
              Submit
            </button>
          </form>
        </>
      )}
    </section>
  );
}
