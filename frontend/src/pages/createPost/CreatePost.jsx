/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

export default function CreatePost() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const { loading, isPostCreated } = useSelector((state) => state.post);

  const [title, setTitle] = useState("");
  const [description, setdDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const formSupmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("post title is requierd");
    if (category.trim() === "") return toast.error("post category is requierd");
    if (description.trim() === "")
      return toast.error("post description is requierd");
    if (!file) return toast.error("post image is requierd");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    dispatch(createPost(formData));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  return (
    <section className="CreatePost">
      <h1 className="CreatePostTitle">Create New Post</h1>
      <form onSubmit={formSupmitHandler} action="" className="CreatePostForm">
        <input
          type="text"
          name=""
          id=""
          placeholder="Post Title"
          className="CreatePostInput"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name=""
          id=""
          className="CreatePostInput"
        >
          <option value="" disabled>
            Select A Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        <textarea
          value={description}
          onChange={(e) => setdDescription(e.target.value)}
          name=""
          id=""
          rows="5"
          className="CreatePostTextarea"
          placeholder="Post Descirption"
        ></textarea>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          name="file"
          id="file"
          className="CreatePostUpload"
        />
        <button type="submit" className="CreatePostBtn">
          {loading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </section>
  );
}
