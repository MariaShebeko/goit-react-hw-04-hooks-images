import './App.css';
import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [imageName, setImageName] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    if (imageName) {
      setStatus('pending');

      imageAPI
        .fetchImage(imageName, page)
        .then(resImages => {
          if (resImages.length === 0) {
            toastify('Nothing found on your request!');
          } else {
            setImages([...images, ...resImages]);
            setStatus('resolved');
            setModalUrl(resImages.largeImageURL);
          }
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [page, imageName]);

  const onLoadMore = () => {
    setLoading(true);
    setPage(page + 1);

    const options = {
      top: null,
      behavior: 'smooth',
    };
    options.top = window.pageYOffset + document.documentElement.clientHeight;
    setTimeout(() => {
      console.log('scrol');

      window.scrollTo(options);
    }, 1000);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onImageClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    e.preventDefault();

    const imageModal = e.target.getAttribute('srcmodal');
    const altModal = e.target.getAttribute('alt');

    setShowModal(true);
    setModalUrl(imageModal);
    setModalAlt(altModal);
  };

  const handleSearchBarSubmit = imageName => {
    setImageName(imageName);
    setImages([]);
    setPage(1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchBarSubmit} />
      <ToastContainer />

      {status === 'idle' && (
        <div className={s.text}>Press the name of the image</div>
      )}
      <ImageGallery images={images} onClick={onImageClick} />
      {status === 'pending' && <ImageLoader />}

      {status === 'rejected' && <ImageErrorView message={error.message} />}

      {status === 'resolved' && (
        <>
          {showModal && (
            <Modal
              onClose={toggleModal}
              modalUrl={modalUrl}
              modalAlt={modalAlt}
            />
          )}
          {images.length > 11 && !loading && (
            <LoadMoreButton onClick={onLoadMore} />
          )}
        </>
      )}
    </>
  );
}
