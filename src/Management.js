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
  
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [uploadDate, setUploadDate] = useState(image.uploadDate);

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

  const startEditing = (commentId, content) => {
    setCurrentCommentId(commentId);
    setEditContent(content);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditContent(e.target.value);
  };

  const saveEdit = async () => {
    try {
      await axios.put(`http://localhost:5205/api/comment/${currentCommentId}`, {
        content: editContent,
      });
      setIsEditing(false);
      setEditContent("");
      fetchComments(page); // Refresh comments after update
    } catch (error) {
      console.error("An error occurred while updating the comment", error);
    }
  };

  const updateImage = async (id) => {
    try {
      const updatedImage = {
        title: title,
        imageDescription: description,
        url: url,
        uploadDate: uploadDate,
      };
      await axios.put(`http://localhost:5205/api/image/${id}`, updatedImage);
      history.push("/MyLibrary");
    } catch (error) {
      console.error("An error occurred while updating the image", error);
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
            {isEditing ? (
                <>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={ManagementCSS.inputField}
                    placeholder="Title"
                  />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={ManagementCSS.textareaField}
                    placeholder="Description"
                  />
                  
                  <button
                    onClick={() => updateImage(image.imageId)}
                    className={ManagementCSS.updateButton}
                  >
                    Update
                  </button>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h2 className={ManagementCSS.title}>{title}</h2>
                    <FontAwesomeIcon
                      icon={faPen}
                      onClick={() => setIsEditing(!isEditing)}
                      className={ManagementCSS.penIcon}
                    />
                    <div><p className={ManagementCSS.description}>{description}</p></div>
                  </div>
                  
                </>
              )}
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
                    console.log("Rendering comment:", comment);
                    return (
                      <li
                        key={comment.commentId}
                        className={ManagementCSS.commentItem}
                      >
                        <strong>{comment.createdBy}</strong>
                        {isEditing && comment.commentId === currentCommentId ? (
                          <div>
                            <textarea
                              value={editContent}
                              onChange={handleEditChange}
                            />
                            <button onClick={saveEdit}>Save</button>
                            <button onClick={() => setIsEditing(false)}>
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <>
                            <p>{comment.content}</p>
                            <div className={ManagementCSS.commentActions}>
                              <FontAwesomeIcon
                                icon={faPen}
                                onClick={() =>
                                  startEditing(
                                    comment.commentId,
                                    comment.content
                                  )
                                }
                                className={ManagementCSS.editIcon}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() => deleteComment(comment.commentId)}
                                className={ManagementCSS.deleteIcon}
                              />
                            </div>
                          </>
                        )}
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
