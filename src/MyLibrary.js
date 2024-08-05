import React, { useState, useEffect } from 'react';
import LibraryCSS from './MyLibrary.module.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Import only FaSearch
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as OutlineHeart } from '@fortawesome/free-regular-svg-icons'; // Import outlined heart icon
import { faComment as OutlineComment } from '@fortawesome/free-regular-svg-icons'; // Import outlined comment icon
import { faTag } from '@fortawesome/free-solid-svg-icons'; // Use the solid tag icon
import Navbar from './components/Navbar';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const MyLibrary = () => {
	const [images, setImages] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [tags, setTags] = useState([]); // State for tags
	const [selectedTag, setSelectedTag] = useState(''); // State for selected tag
	const history = useHistory(); // For navigation
	const imagesPerPage = 6; // Number of images per page
  
	// Fetch the uploaded images and tags from the backend when the component mounts
	useEffect(() => {
	  const fetchImages = async () => {
		try {
		  const response = await axios.get("http://localhost:5205/api/image");
		  setImages(response.data); // Update state with fetched images
		} catch (error) {
		  console.error("An error occurred while fetching images", error);
		}
	  };
  
	  const fetchTags = async () => {
		try {
		  const response = await axios.get("http://localhost:5205/api/tag");
		  setTags(response.data); // Update state with fetched tags
		} catch (error) {
		  console.error("An error occurred while fetching tags", error);
		}
	  };
  
	  fetchImages();
	  fetchTags();
	}, []);
  
	// Logic to calculate paginated items
	const indexOfLastItem = currentPage * imagesPerPage;
	const indexOfFirstItem = indexOfLastItem - imagesPerPage;
	const currentItems = (images || []).slice(indexOfFirstItem, indexOfLastItem);
  
	const filteredImages = currentItems.filter((image) =>
	  (image.title && image.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
	  (selectedTag === '' || image.tagId === selectedTag)
	);
  
	// Logic to handle pagination click
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
	// Function to handle image click
	const handleImageClick = (image) => {
	  // Find the tag name for the selected image
	  const tagName = tags.find(tag => tag.tagId === image.tagId)?.tagName;
	  
	  // Navigate to the ImageDetails page with the image and tag name
	  history.push({
		pathname: `/image/${image.imageId}`,
		state: { image: { ...image, tagName } }
	  });
	};
  
	return (
	  <div className={LibraryCSS['home-page']}>
		<Navbar /> {/* Use the Navbar component */}
		<div className={LibraryCSS['form-group']}>
      <h2 className={LibraryCSS['library-title']}>My Library</h2> {/* Add a class for styling */}
    </div>
		<div className={LibraryCSS['image-grid']}>
		  {filteredImages.map(image => (
			<div 
			  key={image.imageId} 
			  className={LibraryCSS['image-item']}
			  onClick={() => handleImageClick(image)} // Handle click event
			>
			  <img src={image.url} alt={image.title} /> 
			  <div className={LibraryCSS["item-details"]}>
				<h4 className="name">{image.title}
				  <FontAwesomeIcon icon={faTag} className={LibraryCSS.tag} /></h4>
				<div className={LibraryCSS.icons}>
				  <FontAwesomeIcon icon={OutlineHeart} className={LibraryCSS.iconSmall} />
				  <FontAwesomeIcon icon={OutlineComment} className={LibraryCSS.iconSmall} />
				</div>
			  </div>
			</div>
		  ))}
		</div>
		      {/* Pagination */}
			  <div className={LibraryCSS.pagination}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1} // Disable if on the first page
          className={currentPage === 1 ? LibraryCSS.disabled : ""}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        {[...Array(Math.ceil(images.length / imagesPerPage)).keys()].map(
          (page) => (
            <button
              key={page + 1}
              onClick={() => paginate(page + 1)}
              className={currentPage === page + 1 ? LibraryCSS.active : ""}
            >
              {page + 1}
            </button>
          )
        )}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(images.length / imagesPerPage)} // Disable if on the last page
          className={
            currentPage === Math.ceil(images.length / imagesPerPage)
              ? LibraryCSS.disabled
              : ""
          }
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};
  
  export default MyLibrary;