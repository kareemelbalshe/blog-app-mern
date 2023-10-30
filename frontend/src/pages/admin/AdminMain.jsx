/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AddCategoryForm from "./AddCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { getUsersCount } from "../../redux/apiCalls/profileApiCall";
import { getPostCount } from "../../redux/apiCalls/postApiCall";
import { featchAllComments } from "../../redux/apiCalls/commentApiCall";

export default function AdminMain() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { usersCount } = useSelector((state) => state.profile);
  const { postCount } = useSelector((state) => state.post);
  const { comments } = useSelector((state) => state.comment);
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getUsersCount());
    dispatch(getPostCount());
    dispatch(featchAllComments());
  }, []);
  return (
    <div className="AdminMain">
      <div className="AdminMainHeader">
        <div className="AdminMainCard">
          <h5 className="AdminCardTitle">User</h5>
          <div className="AdminCardCount">{usersCount}</div>
          <div className="AdminCardLinkWrapper">
            <Link className="AdminCardLink" to="/admin-dashboard/users-table">
              See all users
            </Link>
            <div className="AdminCardIcon">
              <i className="bi bi-person"></i>
            </div>
          </div>
        </div>
        <div className="AdminMainCard">
          <h5 className="AdminCardTitle">Posts</h5>
          <div className="AdminCardCount">{postCount}</div>
          <div className="AdminCardLinkWrapper">
            <Link className="AdminCardLink" to="/admin-dashboard/posts-table">
              See all posts
            </Link>
            <div className="AdminCardIcon">
              <i className="bi bi-file-post"></i>
            </div>
          </div>
        </div>
        <div className="AdminMainCard">
          <h5 className="AdminCardTitle">Categories</h5>
          <div className="AdminCardCount">{categories.length}</div>
          <div className="AdminCardLinkWrapper">
            <Link
              className="AdminCardLink"
              to="/admin-dashboard/categories-table"
            >
              See all Categories
            </Link>
            <div className="AdminCardIcon">
              <i className="bi bi-tag-fill"></i>
            </div>
          </div>
        </div>
        <div className="AdminMainCard">
          <h5 className="AdminCardTitle">Comments</h5>
          <div className="AdminCardCount">{comments.length}</div>
          <div className="AdminCardLinkWrapper">
            <Link
              className="AdminCardLink"
              to="/admin-dashboard/comments-table"
            >
              See all Comments
            </Link>
            <div className="AdminCardIcon">
              <i className="bi bi-chat-left-text"></i>
            </div>
          </div>
        </div>
      </div>
      <AddCategoryForm />
    </div>
  );
}
