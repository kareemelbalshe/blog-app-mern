/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import "./PostDeatails.css";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import UpdatePostModel from "./UpdatePostModel";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchSinglePost,
  toggleLikePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCall";

export default function PostDeatails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePost(id));
  }, [id]);

  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  const updateImageSubmit = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no images");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
  };

  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  return (
    <section className="PostDeatails">
      <div className="PostDeatailsImageWrapper">
        <img
          src={file ? URL.createObjectURL(file) : post?.image.url}
          alt=""
          className="PostDeatailsImage"
        />
        {user?._id === post?.user?._id && (
          <form onSubmit={updateImageSubmit} className="updarePostImageForm">
            <label htmlFor="file" className="updatePostLabel">
              <i className="bi bi-image-fill"></i>
              Select New Image
            </label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
            />
            <button type="submit">upload</button>
          </form>
        )}
      </div>
      <h1 className="PostDeatailsTitle">{post?.title}</h1>
      <div className="PostDeatailsUserInfo">
        <img
          src={post?.user.profilePhoto?.url}
          alt=""
          className="PostDeatailsUserImage"
        />
        <div className="PostDeatailsUser">
          <strong>
            <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="PostDeatailsDescription">{post?.description}</p>
      <div className="PostDeatailsIconWrapper">
        <div className="">
          {user && (
            <i
              onClick={() => dispatch(toggleLikePost(post?._id))}
              className={
                post?.likes.includes(user?._id)
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up"
              }
            ></i>
          )}
          <small>{post?.likes.length} likes</small>
        </div>
        {user?._id === post?.user?._id && (
          <div className="">
            <i
              onClick={() => setUpdatePost(true)}
              className="bi bi-pencil-square"
            ></i>
            <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
          </div>
        )}
      </div>
      {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <p className="postDetailsInfoWrite">
          to write a comment you should login first
        </p>
      )}
      <CommentList comments={post?.comments} />
      {updatePost && (
        <UpdatePostModel post={post} setUpdatePost={setUpdatePost} />
      )}
    </section>
  );
}
