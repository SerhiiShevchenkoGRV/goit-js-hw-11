import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../src/img/error-white.svg';

import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

export const gallery = document.querySelector('.gallery');
const loader = gallery.querySelector('.loader');
const form = document.querySelector('.form');
const input = form.querySelector('.search-input');

const toastOptions = {
  title: 'Error',
  titleSize: '16px',
  messageSize: '16px',
  messageColor: '#fff',
  color: '#ef4040',
  position: 'topRight',
  iconUrl: iconError,
  theme: 'dark',
};

const toggleLoader = isVisible => {
  loader.hidden = !isVisible;
};

const clearGallery = () => {
  gallery.innerHTML = '';
};

toggleLoader(false);

const searchFunction = event => {
  event.preventDefault();
  toggleLoader(true);

  const inputValue = input.value.trim();
  if (!inputValue) {
    iziToast.show({
      ...toastOptions,
      message: 'Please enter a search term!',
    });
    clearGallery();
    return;
  }

  fetchImages(inputValue)
    .then(respObj => {
      if (respObj.hits.length === 0) {
        clearGallery();
        iziToast.show({
          ...toastOptions,
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        renderGallery(respObj.hits);
      }
    })
    .catch(error => {
      clearGallery();
      iziToast.show({
        ...toastOptions,
        message: error,
      });
    });
};

form.addEventListener('submit', searchFunction);
