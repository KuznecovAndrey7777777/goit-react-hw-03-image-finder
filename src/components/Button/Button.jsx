import React from 'react';
import './Button.css';

const Button = ({ onLoadMore }) => (
  <button className="Button" onClick={onLoadMore}>
    Load more
  </button>
);

export default Button;
