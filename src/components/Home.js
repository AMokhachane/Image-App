import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import HomeCSS from "./Home.module.css";
import { FaSearch } from "react-icons/fa"; // Import only FaSearch
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as OutlineHeart } from "@fortawesome/free-regular-svg-icons"; // Import outlined heart icon
import { faComment as OutlineComment } from "@fortawesome/free-regular-svg-icons"; // Import outlined comment icon
import { faTag } from "@fortawesome/free-solid-svg-icons"; // Use the solid tag icon
import Navbar from "./Navbar"; // Import the Navbar component
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tags, setTags] = useState([]); // State for tags
  const [selectedTag, setSelectedTag] = useState(""); // State for selected tag
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

  const filteredImages = currentItems.filter(
    (image) =>
      image.title &&
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === "" || image.tagId === selectedTag)
  );

  // Logic to handle pagination click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle image click
  const handleImageClick = (image) => {
    // Find the tag name for the selected image
    const tagName = tags.find((tag) => tag.tagId === image.tagId)?.tagName;

    // Navigate to the ImageDetails page with the image and tag name
    history.push({
      pathname: `/image/${image.imageId}`,
      state: { image: { ...image, tagName } },
    });
  };

  return (
    <div className={HomeCSS["home-page"]}>
      <Navbar /> {/* Use the Navbar component */}
      <div className={HomeCSS["form-group"]}>
        <div className={HomeCSS.inputBox}>
          <FaSearch className={HomeCSS.icon} />
          <input
            type="text"
            placeholder="Search for..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={HomeCSS["search-bar"]}
          />
          <select
            className={HomeCSS.filters}
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">Filter</option>
            {tags.map((tag) => (
              <option key={tag.tagId} value={tag.tagId}>
                {tag.tagName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={HomeCSS["image-grid"]}>
        {filteredImages.map((image) => (
          <div
            key={image.imageId}
            className={HomeCSS["image-item"]}
            onClick={() => handleImageClick(image)} // Handle click event
          >
            <img src={image.url} alt={image.title} />
            <div className={HomeCSS["item-details"]}>
              <h4 className="name">
                {image.title}
                <FontAwesomeIcon icon={faTag} className={HomeCSS.tag} />
              </h4>
              <div className={HomeCSS.icons}>
                <FontAwesomeIcon
                  icon={OutlineHeart}
                  className={HomeCSS.iconSmall}
                />
                <FontAwesomeIcon
                  icon={OutlineComment}
                  className={HomeCSS.iconSmall}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className={HomeCSS.pagination}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1} // Disable if on the first page
          className={currentPage === 1 ? HomeCSS.disabled : ""}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        {[...Array(Math.ceil(images.length / imagesPerPage)).keys()].map(
          (page) => (
            <button
              key={page + 1}
              onClick={() => paginate(page + 1)}
              className={currentPage === page + 1 ? HomeCSS.active : ""}
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
              ? HomeCSS.disabled
              : ""
          }
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Home;
