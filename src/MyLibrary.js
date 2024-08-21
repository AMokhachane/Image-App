import React, { useState, useEffect } from "react";
import LibraryCSS from "./MyLibrary.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as OutlineHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment as OutlineComment } from "@fortawesome/free-regular-svg-icons";
import Navbar from "./components/Navbar";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const MyLibrary = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [userName, setUserName] = useState(""); // Changed state to store username
  const [userInfo, setUserInfo] = useState(null); // Added state to store user info
  const history = useHistory();
  const imagesPerPage = 6;

  const fetchImages = async (userName) => {
    try {
      const response = await axios.get(
        `http://localhost:5205/api/image/user/${userName}`
      );
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

  useEffect(() => {
    fetchTags();
  }, []);

  // New useEffect to check for stored user info and fetch images
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserInfo(user);
      setUserName(user.userName); // Set the username in the input field
      fetchImages(user.userName); // Fetch images by username
    }
  }, []);

  // const handleSearch = () => {
  //   if (userName) {
  //     fetchImages(userName); // Fetch images by username
  //   }
  // };

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleImageClick = (image) => {
    const tagName = tags.find((tag) => tag.tagId === image.tagId)?.tagName;
    history.push({
      pathname: `/management/${image.imageId}`,
      state: { image: { ...image, tagName } },
    });
  };

  return (
    <div className={LibraryCSS["home-page"]}>
      <Navbar />
      <div className={LibraryCSS["form-group"]}>
        <h2 className={LibraryCSS["library-title"]}>My Library</h2>
      </div>
      <div className={LibraryCSS["image-grid"]}>
        {filteredImages.map((image) => (
          <div
            key={image.imageId}
            className={LibraryCSS["image-item"]}
            onClick={() => handleImageClick(image)}
          >
            <img src={image.url} alt={image.title} />
            <div className={LibraryCSS["item-details"]}>
              <h4 className="name">{image.title}</h4>
              <div className={LibraryCSS.icons}>
                <FontAwesomeIcon
                  icon={OutlineHeart}
                  className={LibraryCSS.iconSmall}
                />
                <FontAwesomeIcon
                  icon={OutlineComment}
                  className={LibraryCSS.iconSmall}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className={LibraryCSS.pagination}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
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
          disabled={currentPage === Math.ceil(images.length / imagesPerPage)}
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
