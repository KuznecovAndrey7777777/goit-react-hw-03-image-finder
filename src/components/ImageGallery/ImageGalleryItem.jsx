import React from 'react';
import './ImageGalleryItem.css';

const ImageGalleryItem = ({ image, onImageClick }) => (
  <li
    className="ImageGalleryItem"
    onClick={() => onImageClick(image.largeImageURL)}
  >
    <img
      src={image.webformatURL}
      alt={image.tags}
      className="ImageGalleryItem-image"
    />
  </li>
);

export default ImageGalleryItem;
