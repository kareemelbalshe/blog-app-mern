import React from "react";
import PostItem from "./PostItem";
import "./posts.css";

export default function PostList({ posts }) {
  return (
    <div className="postList">
      {posts.map((item) => (
        <PostItem post={item} key={item._id} />
      ))}
    </div>
  );
}
