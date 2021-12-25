import axios from 'axios';

const API_KEY = '23951703-436932e17dab2edd529d032c5';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImage(query, page) {
  return axios
    .get(
      `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(res => {
      if (res.status === 200 && res.data.hits.length !== 0) {
        return res.data.hits;
      } else {
        return Promise.reject(new Error('No images with this name'));
      }
    });
}

const api = {
  fetchImage,
};

export default api;
