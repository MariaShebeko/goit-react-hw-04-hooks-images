import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSistrix } from 'react-icons/fa';
import toastify from '../../helpers/toastify';
import s from './Searchbar.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const handleNameSubmit = event => {
    event.preventDefault();

    if (imageName.trim() === '') {
      toastify('Press the name of the image!');
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleNameSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.label}>Search</span> <FaSistrix />
        </button>
        <input
          onChange={handleNameChange}
          value={imageName}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
