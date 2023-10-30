import React, { useState } from "react";
import "./AddComment.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/apiCalls/commentApiCall";

export default function AddComment({ postId }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const formSupmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Pleace write something");
    dispatch(createComment({ text, postId }));
    setText("");
  };
  return (
    <form onSubmit={formSupmitHandler} className="AddComment">
      <input
        type="text"
        placeholder="Add a comment"
        className="AddCommentInput"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="AddCommentBtn">
        Comment
      </button>
    </form>
  );
}
