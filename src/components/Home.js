import React, { useState } from 'react';
import HomeCSS from './Home.module.css';
import { FaSearch } from 'react-icons/fa';
import { IoFilterSharp } from 'react-icons/io5';
import Navbar from './Navbar'; // Import the Navbar component

export const Home = ({ images, imagePreviewUrl, deleteImage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 7; // Number of images per page

  // Logic to calculate paginated items
  const indexOfLastItem = currentPage * imagesPerPage;
  const indexOfFirstItem = indexOfLastItem - imagesPerPage;
  const currentItems = (images || []).slice(indexOfFirstItem, indexOfLastItem);

  const filteredImages = currentItems.filter((image) =>
    image.name && image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logic to handle pagination click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <div key={image.id} className={HomeCSS['image-item']}>
            <img src={image.src} alt={image.name} />
            <div className={HomeCSS["item-details"]}>
              <h4 className="name">{image.name}</h4>
              <p className="description">{image.description}</p>
              <button onClick={() => deleteImage(image.id)} className={HomeCSS.deleteButton}>
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