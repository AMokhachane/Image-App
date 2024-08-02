import React, { useState } from 'react';
import axios from 'axios';
import styles from './ImageUpload.module.css'; // Import the CSS module




const ImageUpload = () => {
   

    const [imageSelected, setImageSelected] = useState("")

    const uploadImage = () =>{
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "wywylbfz")

        axios.post("https://api.cloudinary.com/v1_1/drgxphf5l/image/upload", 
            formData
        ).then((response) => {
            console.log(response);
        });
};

    return (
        <div className={styles.parentContainer}>
            <div className={styles.box}>
            <div className={styles.rightAlign}><input type="file"
            onChange={(event) => {
                setImageSelected(event.target.files[0]);
            }}
            />
            <button onClick={uploadImage}> Upload Image</button>
            </div>
            </div>
            </div>
                
    );
};

export default ImageUpload;