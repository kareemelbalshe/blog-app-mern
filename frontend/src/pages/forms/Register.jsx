import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";

export default function Register() {
  const dispatch = useDispatch();
  const { registerMessage } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSupmitHandler = (e) => {
    e.preventDefault();

    if (username.trim() === "") return toast.error("Useruser is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
    dispatch(registerUser({ username, email, password }));
  };
  const navigate = useNavigate();
  if (registerMessage) {
    swal({
      title: registerMessage,
      icon: "success",
    }).then((isOk) => {
      if (isOk) {
        navigate("/login");
      }
    });
  }
  return (
    <section className="FormContainer">
      <h1 className="FormTitle">Create new account</h1>
      <form onSubmit={formSupmitHandler} className="Form">
        <div className="FormGroup">
          <label htmlFor="user" className="FormLabel">
            Useruser
          </label>
          <input
            type="text"
            user=""
            id="user"
            placeholder="Enter your user"
            className="FormInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="FormGroup">
          <label htmlFor="email" className="FormLabel">
            Email
          </label>
          <input
            type="email"
            user=""
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
            user=""
            id="password"
            placeholder="Enter your password"
            className="FormInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="FormBtn">
          Register
        </button>
      </form>
      <div className="FormFooter">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </section>
  );
}
