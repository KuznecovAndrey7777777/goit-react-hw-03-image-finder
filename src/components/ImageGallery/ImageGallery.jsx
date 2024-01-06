import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import './ImageGallery.css';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className="ImageGallery">
    {images.map(image => (
      <ImageGalleryItem
        key={image.id}
        image={image}
        onImageClick={onImageClick}
      />
    ))}
  </ul>
);

export default ImageGallery;
