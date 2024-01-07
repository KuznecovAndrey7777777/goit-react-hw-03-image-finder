import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import './App.css';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    hasMoreImages: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery || prevState.currentPage !== this.state.currentPage) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { searchQuery, currentPage } = this.state;
    const apiKey = '31731640-63415b264c7abe0734c9208e1';
    const url = `https://pixabay.com/api/?q=${encodeURIComponent(searchQuery)}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Помилка отримання зображень');
      }
      const data = await response.json();
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        isLoading: false,
        hasMoreImages: data.hits.length > 0,
      }));
    } catch (error) {
      console.error('Під час отримання зображень сталася помилка:', error);
      this.setState({ isLoading: false, hasMoreImages: false });
    }
  };

  handleSearchSubmit = (query) => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      hasMoreImages: true,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  openModal = (imageURL) => {
    this.setState({
      showModal: true,
      largeImageURL: imageURL,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
    });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, hasMoreImages } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && hasMoreImages && !isLoading && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal image={largeImageURL} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
