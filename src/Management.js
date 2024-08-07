import React, {useState }from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import ManagementCSS from './Management.module.css';

const Management = () => {
  const history = useHistory();
  const location = useLocation();
  const { image } = location.state;
  const [isEditing, setIsEditing] = useState(false);
const [editTitle, setEditTitle] = useState(image.title);
const [editDescription, setEditDescription] = useState(image.imageDescription || '');

  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:5205/api/image/${id}`);
      history.push('/MyLibrary');
    } catch (error) {
      console.error("An error occurred while deleting the image", error);
    }
  };

  const editImage = async (id) => {
    try {
      await axios.put(`http://localhost:5205/api/image/${id}`);
      history.push('/MyLibrary');
    } catch (error) {
      console.error("An error occurred while deleting the image", error);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Update the image state with new values
    image.title = editTitle;
    image.imageDescription = editDescription;
    setIsEditing(false);
  };

  return (
    <div className={ManagementCSS['image-details-page']}>
      <div className={ManagementCSS['image-details-box']}>
      <button onClick={() => history.goBack()} className={ManagementCSS.backButton}>X</button>
        <div className={ManagementCSS['image-details']}>
          <img src={image.url} alt={image.title} className={ManagementCSS.image} />
          <div className={ManagementCSS['details']}>
            {isEditing ? (
              <form onSubmit={handleEditSubmit} className={ManagementCSS.editForm}>
                <div>
                  <label>Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Description</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                </div>
                <button type="submit" className={ManagementCSS.saveButton}>Save</button>
                <button type="button" onClick={() => setIsEditing(false)} className={ManagementCSS.cancelButton}>Cancel</button>
              </form>
            ) : (
              <>
                <h4 className="name">{image.title}</h4>
                <p className="description">{image.imageDescription}</p>
                <button onClick={() => setIsEditing(true)} className={ManagementCSS.editButton}>Edit</button>
              </>
            )}
            <button onClick={() => deleteImage(image.imageId)} className={ManagementCSS.deleteButton}>
              Delete
            </button>
			<button onClick={() => editImage(image.imageId)} className={ManagementCSS.deleteButton}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Management;