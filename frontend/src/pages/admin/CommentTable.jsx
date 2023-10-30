/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import "./adminTable.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  featchAllComments,
} from "../../redux/apiCalls/commentApiCall";

export default function CommentTable() {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);
  useEffect(() => {
    dispatch(featchAllComments());
  }, []);
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(commentId));
      }
    });
  };

  return (
    <section className="TableContainer">
      <AdminSidebar />
      <div className="TableWrapper">
        <h1 className="TableTitle">Comments</h1>
        <table className="Table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item, index) => (
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
                <td>{item.text}</td>
                <td>
                  <div className="TableButtonGroup">
                    <button onClick={() => deleteCommentHandler(item._id)}>
                      Delete Comment
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
