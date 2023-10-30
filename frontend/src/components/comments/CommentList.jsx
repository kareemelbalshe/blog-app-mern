import React, { useState } from "react";
import "./CommentList.css";
import swal from "sweetalert";
import UpdateComments from "./UpdateComments";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

export default function CommentList({ comments }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(false);

  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteComment(commentId));
      }
    });
  };

  return (
    <div className="CommentList">
      <h4 className="CommentListCount">{comments?.length} Comments</h4>
      {comments?.map((comment) => (
        <div key={comment._id} className="CommentItem">
          <div className="CommentItemInfo">
            <div className="CommentItemUsername">{comment.username}</div>
            <div className="CommentItemTime">
              <Moment fromNow ago>
                {comment.createdAt}
              </Moment>{" "}
              ago
            </div>
          </div>
          <p className="CommentItemText">{comment.text}</p>
          {user?._id === comment.user && (
            <div className="CommentItemIconWrapper">
              <i
                onClick={() => updateCommentHandler(comment)}
                className="bi bi-pencil-square"
              ></i>
              <i
                onClick={() => deleteCommentHandler(comment?._id)}
                className="bi bi-trash-fill"
              ></i>
            </div>
          )}
        </div>
      ))}
      {updateComment && (
        <UpdateComments
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
}
