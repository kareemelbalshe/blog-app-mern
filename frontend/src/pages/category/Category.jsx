/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./category.css";
import { Link, useParams } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";

export default function Category() {
  const dispatch = useDispatch();
  const { postCate } = useSelector((state) => state.post);

  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <section className="Category">
      {postCate.length === 0 ? (
        <>
          <h1 className="CategoryNotFound">
            Posts with <span>{category}</span> category not found
          </h1>
          <Link to="/posts" className="CategoryNotFoundLink">
            Go to posts Page
          </Link>
        </>
      ) : (
        <></>
      )}
      <h1 className="CategoryTitle">Posts based on {category}</h1>
      <PostList posts={postCate} />
    </section>
  );
}
