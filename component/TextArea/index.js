'use client'

import React, { useState } from 'react';
import styles from './TextArea.module.scss';

const TextArea = () => {
    const [text, setText] = useState('');
    const [images, setImages] = useState([]);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleImageUpload = (event) => {
        if (images.length < 3) {
            const newImages = [...images, URL.createObjectURL(event.target.files[0])];
            setImages(newImages);
        } else {
            alert('You can only upload up to 3 images.');
        }
    };

    return (
        <div className={styles.textareaContainer}>
            <textarea
                value={text}
                onChange={handleTextChange}
                maxLength={1000}
                placeholder="Type your text here..."
                className={styles.textarea}
            />
            <div className={styles.imageUpload}>
                <input type="file" onChange={handleImageUpload} className={styles.fileInput} />
                <img src="upload-icon.png" alt="Upload" className={styles.uploadIcon} />
            </div>
            <div className={styles.charCount}>{text.length}/1000</div>
            <div className={styles.uploadedImages}>
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Uploaded ${index + 1}`} className={styles.uploadedImage} />
                ))}
            </div>
        </div>
    );
};

export default TextArea;
