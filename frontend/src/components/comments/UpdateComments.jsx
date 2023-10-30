import React, { useState } from "react";
import { toast } from "react-toastify";
import "./UpdateComment.css";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/commentApiCall";

export default function UpdateComments({ setUpdateComment, commentForUpdate }) {
  const dispatch = useDispatch();
  const [text, setText] = useState(commentForUpdate?.text);

  const formSupmitHandler = (e) => {
    e.preventDefault();

    if (text.trim() === "") return toast.error("please write something");

    dispatch(updateComment(commentForUpdate?._id, { text }));
    setUpdateComment(false);
  };

  return (
    <div className="UpdateComment">
      <form onSubmit={formSupmitHandler} className="UpdatePostForm">
        <abbr title="close">
          <i
            onClick={() => setUpdateComment(false)}
            className="bi bi-x-circle-fill UpdateCommentFormClose"
          ></i>
        </abbr>
        <h1 className="UpdateCommentTitle">Edit Comment</h1>
        <input
          type="text"
          name=""
          id=""
          className="UpdateCommentInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="UpdateCommentBtn">
          Edit Comment
        </button>
      </form>
    </div>
  );
}
