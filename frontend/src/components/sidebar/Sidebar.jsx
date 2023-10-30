/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  let url=window.location.href
  let Url=url.substring(url.length-5)
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <div className="Sidebar">
      <h5 className="sidebarTitle">Categories</h5>
      <ul className="sidebarLinks">
        {categories.map((category) => (
          <Link
            key={category._id}
            className="sidebarLink"
            to={Url==="posts"?`categories/${category.title}`:`posts/categories/${category.title}`}
          >
            {category.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}
