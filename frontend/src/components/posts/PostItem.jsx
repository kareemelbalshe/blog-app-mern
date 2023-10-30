import React from "react";
import { Link } from "react-router-dom";

export default function PostItem({ post, username, userId }) {
  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;
  return (
    <div className="postItem">
      <div className="postItemImageWrapper">
        <img src={post?.image.url} alt="" className="postItemImage" />
      </div>
      <div className="postItemInfoWrapper">
        <div className="postItemInfo">
          <div className="postItemAuther">
            <strong>Auther: </strong>
            <Link className="postItemUsername" to={profileLink}>
              {username ? username : post?.user.username}
            </Link>
          </div>
          <div className="postItemDate">
            {new Date(post?.createdAt).toDateString()}
          </div>
        </div>
        <div className="postItemDetails">
          <h4 className="postItemTitle">{post?.title}</h4>
          <Link
            className="postItemCategory"
            to={`/posts/categories/${post?.category}`}
          >
            {post?.category}
          </Link>
        </div>
        <p className="postItemDescription">{post?.description}</p>
        <Link className="postItemLink" to={`/posts/details/${post?._id}`}>
          Read More...
        </Link>
      </div>
    </div>
  );
}
