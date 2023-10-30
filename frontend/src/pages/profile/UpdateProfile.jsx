import React, { useState } from "react";
import "./UpdateProfile.css";
import { useDispatch } from "react-redux";
import { uploadProfile } from "../../redux/apiCalls/profileApiCall";

export default function UpdateProfile({ setUpdateProfile, profile }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [password, setPassword] = useState("");

  const formSupmitHandler = (e) => {
    e.preventDefault();

    const updatedUser = { username, bio };

    if (password.trim() !== "") {
      updatedUser.password = password;
    }
    dispatch(uploadProfile(profile?._id, updatedUser));
    setUpdateProfile(false);
  };

  return (
    <div className="UpdateProfile">
      <form onSubmit={formSupmitHandler} className="UpdateProfileForm">
        <abbr title="close">
          <i
            onClick={() => setUpdateProfile(false)}
            className="bi bi-x-circle-fill UpdateProfileFormClose"
          ></i>
        </abbr>
        <h1 className="UpdateProfileTitle">Update Your Profile</h1>
        <input
          type="text"
          name=""
          id=""
          className="UpdateProfileInput"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          name=""
          id=""
          className="UpdateProfileInput"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          type="password"
          name=""
          id=""
          className="UpdateProfileInput"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="UpdateProfileBtn">
          Update Profile
        </button>
      </form>
    </div>
  );
}
