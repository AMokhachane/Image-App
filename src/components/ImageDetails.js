import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import ImageDetailsCSS from './ImageDetails.module.css';

const ImageDetails = () => {
  const history = useHistory();
  const location = useLocation();
  const { image } = location.state;

  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Retrieve the username from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user ? user.userName : 'Unknown User';

  
  const fetchComments = async (pageNum) => {
    if (!image.imageId || loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5205/api/comment/by-image/${image.imageId}?page=${pageNum}`);
      setComments((prevComments) => {
        // Filter out any duplicate comments
        const newComments = response.data.filter(
          (newComment) => !prevComments.some((comment) => comment.id === newComment.id)
        );
        return [...prevComments, ...newComments];
      });
      setPage(pageNum + 1);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(page);
  }, [image.imageId]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      fetchComments(page);
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

        <div
          className={ImageDetailsCSS['comments-section']}
          onScroll={handleScroll}
          style={{ overflowY: 'auto', maxHeight: '300px' }}
        >
          <h4>Comments</h4>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <strong>{comment.createdBy}</strong> {/* Display the username from local storage */}
                  <p>{comment.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={ImageDetailsCSS['no-comments']}>No comments yet.</p>
          )}
          {loading && <p>Loading more comments...</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;