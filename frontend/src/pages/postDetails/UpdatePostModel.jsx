/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./UpdatePostModel.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

export default function UpdatePostModel({ setUpdatePost, post }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);

  const formSupmitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "") return toast.error("post title is requierd");
    if (category.trim() === "") return toast.error("post category is requierd");
    if (description.trim() === "")
      return toast.error("post description is requierd");

    dispatch(updatePost({ title, category, description }, post?._id));
    setUpdatePost(false);
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="UpdatePost">
      <form onSubmit={formSupmitHandler} className="UpdatePostForm">
        <abbr title="close">
          <i
            onClick={() => setUpdatePost(false)}
            className="bi bi-x-circle-fill UpdatePostFormClose"
          ></i>
        </abbr>
        <h1 className="UpdatePostTitle">Update Post</h1>
        <input
          type="text"
          name=""
          id=""
          className="UpdatePostInput"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          name=""
          id=""
          className="UpdatePostInput"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          className="UpdatePostTextarea"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit" className="UpdatePostBtn">
          Update Post
        </button>
      </form>
    </div>
  );
}
