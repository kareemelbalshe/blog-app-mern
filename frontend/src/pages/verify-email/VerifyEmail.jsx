/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./verifyEmail.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";

export default function VerifyEmail() {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector((state) => state.auth);
  const { userId, token } = useParams();
  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [userId, token]);
  return (
    <div className="VerifyEmail">
      {isEmailVerified ? (
        <>
          <i className="bi bi-patch-check VerifyEmailIcon"></i>
          <h1 className="VerifyEmailTitle">
            Your Email address has been succeaafully verified
          </h1>
          <Link to="/login" className="VerifyEmailLink">
            Go To Login Page
          </Link>
        </>
      ) : (
        <>
          <h1 className="VerifyEmailNotFound">Not Found</h1>
        </>
      )}
    </div>
  );
}
