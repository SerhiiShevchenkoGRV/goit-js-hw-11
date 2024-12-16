import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { gallery } from '../main';

let lightbox;

export const renderGallery = images => {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,

        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}">
  </a>
  <div class="gallery-item-info">
    <div class="info-row">
      <h2 class="info-title">Likes:</h2>
      <p class="info-value">${likes}</p>
    </div>
    <div class="info-row">
      <h2 class="info-title">Views:</h2>
      <p class="info-value">${views}</p>
    </div>
    <div class="info-row">
      <h2 class="info-title">Comments:</h2>
      <p class="info-value">${comments}</p>
    </div>
    <div class="info-row">
      <h2 class="info-title">Downloads:</h2>
      <p class="info-value">${downloads}</p>
    </div>
  </div>
</li>`
    )
    .join('');
  gallery.innerHTML = markup;

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      overlay: true,
    });
  } else {
    lightbox.refresh();
  }

  return markup;
};
