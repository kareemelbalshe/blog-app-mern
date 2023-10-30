/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./home.css";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";

export default function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, []);

  return (
    <section className="home">
      <div className="homeHeroHeader">
        <div className="homeHeroHeaderLayout">
          <h1 className="homeTitle">Welcome to Blog</h1>
        </div>
      </div>
      <div className="homeLatestPost">Latest Posts</div>
      <div className="homeContainer">
        <PostList posts={posts} />
        <Sidebar />
      </div>
      <div className="homeSeePostsLink">
        <Link to="/posts" className="homeLink">
          See All Posts
        </Link>
      </div>
    </section>
  );
}
