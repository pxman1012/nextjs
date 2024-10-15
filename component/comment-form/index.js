import React, { useState, useRef } from 'react';
import styles from './CommentForm.module.scss';

function CommentForm() {
    const [comment, setComment] = useState('');
    const [images, setImages] = useState([]);
    const [submittedImages, setSubmittedImages] = useState([]);
    const fileInputRef = useRef(null);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const fileUrls = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...fileUrls]);
    };

    const handleDeleteImage = (imageUrl) => {
        setImages(images.filter((image) => image !== imageUrl));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic gửi comment và images
        console.log('Comment:', comment);
        console.log('Images:', images);
        setSubmittedImages(images);
        setComment('');
        setImages([]);
    };

    const handleChooseImageClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.submittedImages}>
                {submittedImages.map((image, index) => (
                    <div key={index} className={styles.imageContainer}>
                        <img src={image} alt={`submitted-${index}`} className={styles.image} />
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.textareaContainer}>
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Enter your comment"
                        className={styles.textarea}
                    ></textarea>
                    <button type="button" onClick={handleChooseImageClick} className={styles.chooseImageButton}>
                        📷
                    </button>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        className={styles.fileInput}
                    />
                </div>
                <div className={styles.imagePreview}>
                    {images.map((image, index) => (
                        <div key={index} className={styles.imageContainer}>
                            <img src={image} alt={`preview-${index}`} className={styles.image} />
                            <button type="button" onClick={() => handleDeleteImage(image)} className={styles.deleteButton}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </div>
    );
}

export default CommentForm;
