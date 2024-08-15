import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ImageDetailsCSS from './ImageDetails.module.css';

const ImageDetails = () => {
  const history = useHistory();
  const location = useLocation();
  const { image } = location.state;

  // State for comments
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState('');

  const handleCommentChange = (e) => {
    setCurrentComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (currentComment.trim() !== '') {
      setComments([...comments, currentComment]);
      setCurrentComment(''); // Clear the input after submitting
    }
  };

  return (
    <div className={ImageDetailsCSS['image-details-page']}>
      <div className={ImageDetailsCSS['image-details-box']}>
        <button onClick={() => history.goBack()} className={ImageDetailsCSS.backButton}>X</button>
        <div className={ImageDetailsCSS['image-details']}>
          <img src={image.url} alt={image.title} className={ImageDetailsCSS.image} />
          <div className={ImageDetailsCSS['details']}>
            <h4 className="name">{image.title}</h4>
            <p className="description">{image.imageDescription}</p>
          </div>
        </div>
        
        
        <div className={ImageDetailsCSS['comment-section']}>
          <input
            type="text"
            value={currentComment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            className={ImageDetailsCSS.commentInput}
          />
          <button onClick={handleCommentSubmit} className={ImageDetailsCSS.commentButton}>
            Submit
          </button>
          <div>
            <h4>Comments:</h4>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <p key={index}>{comment}</p>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;