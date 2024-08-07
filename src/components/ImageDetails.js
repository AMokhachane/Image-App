import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ImageDetailsCSS from './ImageDetails.module.css';

const ImageDetails = () => {
  const history = useHistory();
  const location = useLocation();
  const { image } = location.state;

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
      </div>
    </div>
  );
};

export default ImageDetails;