import React, { useState } from 'react';
import CommentsCSS from './Comments.module.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Comments = () => {
  const [currentComment, setCurrentComment] = useState('');
  const [imageId, setImageId] = useState('');
  const [appUserId, setAppUserId] = useState('');
  const history = useHistory();

  const handleCommentSubmit = async () => {
    try {
      await axios.post(`http://localhost:5205/api/comment/${imageId}`, {
        content: currentComment,
        appUserId: appUserId
      });
      history.push("/Home");
    } catch (error) {
      console.error("An error occurred while posting", error);
    }
  };

  return (
    <div className={CommentsCSS['comment-section']}>
      <input
        type="text"
        value={imageId}
        onChange={(e) => setImageId(e.target.value)}
        placeholder="Enter Image ID..."
        className={CommentsCSS.imageIdInput}
      />
      <input
        type="text"
        value={appUserId}
        onChange={(e) => setAppUserId(e.target.value)}
        placeholder="Enter AppUser ID..."
        className={CommentsCSS.appUserIdInput}
      />
      <input
        type="text"
        value={currentComment}
        onChange={(e) => setCurrentComment(e.target.value)}
        placeholder="Add a comment..."
        className={CommentsCSS.commentInput}
      />
      <button onClick={handleCommentSubmit} className={CommentsCSS.commentButton}>
        Submit
      </button>
    </div>
  );
};

export default Comments;