import './App.css';
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import toastify from './helpers/toastify';
import imageAPI from './services/image-api';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import ImageErrorView from './components/ImageGallery/GalleryErrorView/GalleryErrorView';
import ImageLoader from './components/Loader';
import LoadMoreButton from './components/LoadMoreButton';
import Modal from './components/Modal';
import s from './components/ImageGallery/ImageGallery.module.css';

class App extends Component {
  state = {
    images: [],
    page: 1,
    imageName: '',
    error: null,
    status: 'idle',
    loading: false,
    showModal: false,
    modalUrl: '',
    modalAlt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.imageName !== this.state.imageName) {
      this.setState({
        status: 'pending',
        page: 1,
        images: [],
      });
      this.renderGallery();
    }
  }

  renderGallery = () => {
    const { imageName, page } = this.state;
    imageAPI
      .fetchImage(imageName, page)
      .then(data => {
        return data.hits;
      })
      .then(images => {
        if (images.length === 0) {
          toastify('Nothing found on your request!');
        }
        return this.setState(prevState => {
          return {
            images: [...prevState.images, ...images],
            page: prevState.page + 1,
            status: 'resolved',
            loading: false,
            modalUrl: images.largeImageURL,
          };
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  onLoadMore = () => {
    this.setState({ loading: true });
    this.renderGallery();
    const options = {
      top: null,
      behavior: 'smooth',
    };
    options.top = window.pageYOffset + document.documentElement.clientHeight;
    setTimeout(() => {
      window.scrollTo(options);
    }, 1000);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    e.preventDefault();

    const imageModal = e.target.getAttribute('srcmodal');
    const altModal = e.target.getAttribute('alt');

    this.setState({
      showModal: true,
      modalUrl: imageModal,
      modalAlt: altModal,
    });
  };

  handleSearchBarSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    const { images, error, status, showModal, modalUrl, modalAlt } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSearchBarSubmit} />
        <ToastContainer />

        {status === 'idle' && (
          <div className={s.text}>Press the name of the image</div>
        )}

        {status === 'pending' && <ImageLoader />}

        {status === 'rejected' && <ImageErrorView message={error.message} />}

        {status === 'resolved' && (
          <>
            <ImageGallery images={images} onClick={this.onImageClick} />

            {showModal && (
              <Modal
                onClose={this.toggleModal}
                modalUrl={modalUrl}
                modalAlt={modalAlt}
              />
            )}
            {this.state.images.length > 11 && !this.state.loading && (
              <LoadMoreButton onClick={this.onLoadMore} />
            )}
          </>
        )}
      </>
    );
  }
}

export default App;
