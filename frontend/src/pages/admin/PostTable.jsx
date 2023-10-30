/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import "./adminTable.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts } from "../../redux/apiCalls/postApiCall";

export default function PostTable() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  const deletepostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(postId));
      }
    });
  };

  return (
    <section className="TableContainer">
      <AdminSidebar />
      <div className="TableWrapper">
        <h1 className="TableTitle">Posts</h1>
        <table className="Table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Post Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="TableImage">
                    <img
                      src={item.user.profilePhoto?.url}
                      className="TableUserImage"
                      alt=""
                    />
                    <span className="TableUsername">{item.user.username}</span>
                  </div>
                </td>
                <td>{item.title}</td>
                <td>
                  <div className="TableButtonGroup">
                    <button>
                      <Link to={`/posts/details/${item._id}`}>View Post</Link>
                    </button>
                    <button onClick={() => deletepostHandler(item._id)}>
                      Delete Post
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
