import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./form.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const disPatch = useDispatch();

  const formSupmitHandler = (e) => {
    e.preventDefault();

    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");

    disPatch(loginUser({ email, password }));
  };
  return (
    <section className="FormContainer">
      <h1 className="FormTitle">Login to your account</h1>
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
        <div className="FormGroup">
          <label htmlFor="password" className="FormLabel">
            Password
          </label>
          <input
            type="password"
            name=""
            id="password"
            placeholder="Enter your password"
            className="FormInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="FormBtn">
          Login
        </button>
      </form>
      <div className="FormFooter">
        Did you forget your password?{" "}
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
    </section>
  );
}
