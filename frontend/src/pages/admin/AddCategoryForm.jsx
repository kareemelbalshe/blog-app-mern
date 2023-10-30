import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createCategory } from "../../redux/apiCalls/categoryApiCall";

export default function AddCategoryForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const formSupmitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "") return toast.error("Categoary Title is required");
    dispatch(createCategory({ title }));
    setTitle("");
  };

  return (
    <div className="AddCategory">
      <h6 className="AddCategoryTitle">Add New Category</h6>
      <form onSubmit={formSupmitHandler} className="AddCategoryForm">
        <div className="AddCategoryFormGroup">
          <label htmlFor="title">Category Title</label>
          <input
            type="text"
            name=""
            id="title"
            placeholder="Enter Category Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type="submit" className="AddCategoryBtn">
          Add
        </button>
      </form>
    </div>
  );
}
