import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import ManagementCSS from "./Management.module.css";

const Management = () => {
  const history = useHistory();
  const location = useLocation();
  const { image } = location.state;

  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.imageDescription);
  const [url, setUrl] = useState(image.url);
  const [uploadDate, setUploadDate] = useState(image.uploadDate);
  const [isEditing, setIsEditing] = useState(false);

  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:5205/api/image/${id}`);
      history.push("/MyLibrary");
    } catch (error) {
      console.error("An error occurred while deleting the image", error);
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
