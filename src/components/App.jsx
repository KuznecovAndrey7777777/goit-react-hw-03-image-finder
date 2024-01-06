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
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, currentPage } = this.state;

    if (
      prevState.searchQuery !== searchQuery ||
      prevState.currentPage !== currentPage
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    this.setState({ isLoading: true });
    const { searchQuery, currentPage } = this.state;
    const apiKey = '31731640-63415b264c7abe0734c9208e1';

    try {
      const response = await fetch(
        `https://pixabay.com/api/?q=${encodeURIComponent(
          searchQuery
        )}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
      );
      if (!response.ok) {
        throw new Error('Помилка отримання зображень');
      }
      const data = await response.json();
      this.setState(prevState => ({
        images:
          currentPage === 1 ? data.hits : [...prevState.images, ...data.hits],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Під час отримання зображень сталася помилка:', error);
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  openModal = imageURL => {
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
    const { images, isLoading, showModal, largeImageURL } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {showModal && <Modal image={largeImageURL} onClose={this.closeModal} />}
      </div>
    );
  }
}

export default App;
