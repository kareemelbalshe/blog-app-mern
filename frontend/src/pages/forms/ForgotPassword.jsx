import React, { useState } from "react";
import { toast } from "react-toastify";
import "./form.css";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/apiCalls/passwordApiCall";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const formSupmitHandler = (e) => {
    e.preventDefault();

    if (email.trim() === "") return toast.error("Email is required");
    dispatch(forgotPassword(email));
  };
  return (
    <section className="FormContainer">
      <h1 className="FormTitle">Forgot Password</h1>
      <form onSubmit={formSupmitHandler} className="Form">
        <div className="FormGroup">
          <label htmlFor="email" className="FormLabel">
            Email
          </label>
          <input
            type="email"
            name=""
            id="email"
            placeholder="Enter your email"
            className="FormInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="FormBtn">
          Submit
        </button>
      </form>
    </section>
  );
}
