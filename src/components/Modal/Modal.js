import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ modalUrl, modalAlt, onClose }) {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const onBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={onBackdropClick}>
      <div className={s.modal}>
        <img src={modalUrl} alt={modalAlt}></img>
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalUrl: PropTypes.string.isRequired,
  modalAlt: PropTypes.string.isRequired,
};
