import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeCSS from './Home.module.css';
import { FaSearch } from 'react-icons/fa';
import { IoFilterSharp } from 'react-icons/io5';
import Navbar from './Navbar'; // Import the Navbar component

export const Home = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6; // Number of images per page

  // Fetch the uploaded images from the backend when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5205/api/image");
        setImages(response.data); // Update state with fetched images
      } catch (error) {
        console.error("An error occurred while fetching images", error);
      }
    };

    fetchImages();
  }, []);

  // Logic to calculate paginated items
  const indexOfLastItem = currentPage * imagesPerPage;
  const indexOfFirstItem = indexOfLastItem - imagesPerPage;
  const currentItems = (images || []).slice(indexOfFirstItem, indexOfLastItem);

  const filteredImages = currentItems.filter((image) =>
    image.title && image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logic to handle pagination click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to delete an image
  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:5205/api/image/${id}`);
      // Remove the deleted image from state
      setImages(images.filter(image => image.imageId !== id));
    } catch (error) {
      console.error("An error occurred while deleting the image", error);
    }
  };

  return (
    <div className={HomeCSS['home-page']}>
      <Navbar /> {/* Use the Navbar component */}
      <div className={HomeCSS['form-group']}>
        <div className={HomeCSS.inputBox}>
          <FaSearch className={HomeCSS.icon} />
          <input
            type="text"
            placeholder="Search for..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={HomeCSS['search-bar']}
          />
          <button className={HomeCSS.filters}>
            <IoFilterSharp className='filter' /> Filters
          </button>
        </div>
      </div>
      <div className={HomeCSS['image-grid']}>
        {filteredImages.map(image => (
          <div key={image.imageId} className={HomeCSS['image-item']}>
            <img src={image.url} alt={image.title} /> {/* Using 'url' */}
            <div className={HomeCSS["item-details"]}>
              <h4 className="name">{image.title}</h4> {/* Using 'title' */}
              <p className="description">{image.imageDescription}</p> {/* Using 'imageDescription' */}
              <button onClick={() => deleteImage(image.imageId)} className={HomeCSS.deleteButton}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className={HomeCSS.pagination}>
        {[...Array(Math.ceil(images.length / imagesPerPage)).keys()].map(page => (
          <button
            key={page + 1}
            onClick={() => paginate(page + 1)}
            className={currentPage === page + 1 ? HomeCSS.active : ''}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;