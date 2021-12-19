import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = (
  { webformatURL, tags, largeImageURL, id },
  onClick,
) => {
  return (
    <li className={s.ImageGalleryItem} key={`id_${id}`}>
      <img
        onClick={onClick}
        id={id}
        src={webformatURL}
        alt={tags}
        srcmodal={largeImageURL}
        className={s.image}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
