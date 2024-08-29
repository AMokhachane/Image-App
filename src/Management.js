import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import ManagementCSS from "./Management.module.css";

const Management = () => {
  const history = useHistory();
  const location = useLocation();
  const { image } = location.state;

  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.imageDescription);
  const [url, setUrl] = useState(image.url);
  const [uploadDate, setUploadDate] = useState(image.uploadDate);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:5205/api/image/${id}`);
      history.push("/MyLibrary");
    } catch (error) {
      console.error("An error occurred while deleting the image", error);
    }
  };

  const fetchComments = async (pageNum) => {
    if (!image.imageId || loading) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5205/api/comment/by-image/${image.imageId}?page=${pageNum}`
      );
      setComments((prevComments) => {
        const newComments = response.data.filter(
          (newComment) =>
            !prevComments.some((comment) => comment.id === newComment.id)
        );
        return [...prevComments, ...newComments];
      });
      setPage(pageNum + 1);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(page);
  }, [image.imageId]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      fetchComments(page);
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:5205/api/comment/${id}`);
      history.push("/MyLibrary");
    } catch (error) {
      console.error("An error occurred while deleting the image", error);
    }
  };

  return (
    <div className={ManagementCSS["image-details-page"]}>
      <div className={ManagementCSS["image-details-box"]}>
        <button
          onClick={() => history.goBack()}
          className={ManagementCSS.backButton}
        >
          X
        </button>
        <div className={ManagementCSS["image-details"]}>
          <img
            src={image.url}
            alt={image.title}
            className={ManagementCSS.image}
          />
          <div className={ManagementCSS["details"]}>
            <div className={ManagementCSS["editContainer"]}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2 className={ManagementCSS.title}>{title}</h2>
                <div>
                  <p className={ManagementCSS.description}>{description}</p>
                </div>
              </div>
            </div>

            {/* Comment Section */}
            <div
              className={ManagementCSS["comments-section"]}
              onScroll={handleScroll}
              style={{ overflowY: "auto", maxHeight: "300px" }}
            >
              <h4>Comments</h4>
              {comments.length > 0 ? (
                <ul>
                  {comments.map((comment) => {
                    console.log("Rendering comment:", comment); // Log each comment as it's rendered
                    return (
                      <li key={comment.commentId} className={ManagementCSS.commentItem}>
                        <strong>{comment.createdBy}</strong>
                        <p>{comment.content}</p>
                        <div className={ManagementCSS.commentActions}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => deleteComment(comment.commentId)}
                            className={ManagementCSS.deleteIcon}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className={ManagementCSS["no-comments"]}>No comments yet.</p>
              )}
              {loading && <p>Loading more comments...</p>}
            </div>


            <button
              onClick={() => deleteImage(image.imageId)}
              className={ManagementCSS.deleteButton}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Management; 