import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import ImageDetailsCSS from './ImageDetails.module.css';

const ImageDetails = () => {
  const history = useHistory();
  const location = useLocation();
  const { image } = location.state;

  const [comments, setComments] = useState([]);

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      if (!image.imageId) return;  // Ensure imageId exists before making the request
      try {
        const response = await axios.get(`http://localhost:5205/api/comment/by-image/${image.imageId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [image.imageId]);

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

        {/* Comments section */}
        <div className={ImageDetailsCSS['comments-section']}>
          <h4>Comments</h4>
          {comments.length > 0 ? (
            <ul>
              {comments.map(comment => (
                <li key={comment.id}>
                  <strong>{comment.userName}</strong>: {comment.content}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;