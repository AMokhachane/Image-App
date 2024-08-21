import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import HomeCSS from "./Home.module.css";
import { FaSearch } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as OutlineHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment as OutlineComment } from "@fortawesome/free-regular-svg-icons";
import Navbar from "./Navbar";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const history = useHistory();
  const imagesPerPage = 6;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5205/api/image");
        setImages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("An error occurred while fetching images", error);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:5205/api/tag");
        setTags(response.data);
      } catch (error) {
        console.error("An error occurred while fetching tags", error);
      }
    };

    fetchImages();
    fetchTags();
  }, []);

  const indexOfLastItem = currentPage * imagesPerPage;
  const indexOfFirstItem = indexOfLastItem - imagesPerPage;
  const currentItems = (images || []).slice(indexOfFirstItem, indexOfLastItem);

  const filteredImages = currentItems.filter(
    (image) =>
      image.title &&
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === "" || image.tagId === selectedTag)
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle image click
  const handleImageClick = (image) => {
    const tagName = tags.find((tag) => tag.tagId === image.tagId)?.tagName;
    history.push({
      pathname: `/image/${image.imageId}`,
      state: { image: { ...image, tagName } }, // Passing the whole image object including imageId
    });
  };

  // Handle comment icon click
  const handleCommentClick = (event) => {
    event.stopPropagation(); // Prevent the image click event
    history.push('/comments');
  };

  const generatePagination = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(images.length / imagesPerPage);

    if (totalPages <= 1) return pageNumbers;

    pageNumbers.push(
      <button
        key="prev"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={currentPage === 1 ? HomeCSS.disabled : ""}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    );

    if (currentPage > 2) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => paginate(1)}
          className={currentPage === 1 ? HomeCSS.active : ""}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        pageNumbers.push(
          <button key="dots1" className={HomeCSS.dots}>
            ...
          </button>
        );
      }
    }

    if (currentPage > 1) {
      pageNumbers.push(
        <button
          key={currentPage - 1}
          onClick={() => paginate(currentPage - 1)}
          className={HomeCSS.pageNumber}
        >
          {currentPage - 1}
        </button>
      );
    }

    pageNumbers.push(
      <button key={currentPage} className={HomeCSS.active}>
        {currentPage}
      </button>
    );

    if (currentPage < totalPages) {
      pageNumbers.push(
        <button
          key={currentPage + 1}
          onClick={() => paginate(currentPage + 1)}
          className={HomeCSS.pageNumber}
        >
          {currentPage + 1}
        </button>
      );
    }

    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <button key="dots2" className={HomeCSS.dots}>
            ...
          </button>
        );
      }

      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => paginate(totalPages)}
          className={currentPage === totalPages ? HomeCSS.active : ""}
        >
          {totalPages}
        </button>
      );
    }

    pageNumbers.push(
      <button
        key="next"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={currentPage === totalPages ? HomeCSS.disabled : ""}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    );

    return pageNumbers;
  };

  return (
    <div className={HomeCSS["home-page"]}>
      <Navbar />
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
            onClick={() => handleImageClick(image)}
          >
            <img src={image.url} alt={image.title} />
            <div className={HomeCSS["item-details"]}>
              <h4 className="name">
                {image.title}
              </h4>
              <div className={HomeCSS.icons}>
                <FontAwesomeIcon
                  icon={OutlineHeart}
                  className={HomeCSS.iconSmall}
                />
                <FontAwesomeIcon
                  icon={OutlineComment}
                  className={HomeCSS.iconSmall}
                  onClick={handleCommentClick} // Add click handler
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={HomeCSS.pagination}>{generatePagination()}</div>
    </div>
  );
};

export default Home;