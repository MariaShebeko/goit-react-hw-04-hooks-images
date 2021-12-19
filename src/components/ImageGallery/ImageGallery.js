import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(image => ImageGalleryItem(image, onClick))}
    </ul>
  );
};
export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func.isRequired,
};
