import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import ImageDetailsCSS from './ImageDetails.module.css';
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ImageDetails = () => {
  const history = useHistory();
  const location = useLocation();
  const { image } = location.state;

  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:5205/api/image/${id}`);
      history.push('/Home');
    } catch (error) {
      console.error("An error occurred while deleting the image", error);
    }
  };

  return (
    <div className={ImageDetailsCSS['image-details-page']}>
      <div className={ImageDetailsCSS['image-details-box']}>
        <button onClick={() => history.goBack()} className={ImageDetailsCSS.backButton}>X</button>
        <div className={ImageDetailsCSS['image-details']}>
          <img src={image.url} alt={image.title} className={ImageDetailsCSS.image}/>
          <div className={ImageDetailsCSS['details']}>
          <h4 className="name">
                {image.title}
                <FontAwesomeIcon icon={faTag} className={ImageDetailsCSS.tag} />
              </h4>
            <p className="description">{image.imageDescription}</p> {/* Using 'imageDescription' */}
            <button onClick={() => deleteImage(image.imageId)} className={ImageDetailsCSS.deleteButton}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;