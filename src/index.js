// import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchGallery } from './fetchGallery';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const button = document.querySelector('.btn-box__btn');

const checkInput = e => {
  e.preventDefault();
  fetchGallery(input.value)
    .then(res => {
      renderPhotos(res.hits);
    })
    .catch(error => {
      // Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};

const renderPhotos = elements => {
  if (elements.length) {
    const markup = elements.map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
   <a href="${webformatURL}">
    <img src="${largeImageURL}" alt="${tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${likes}
      </p>
      <p class="info-item">
        <b>Views</b>${views}
      </p>
      <p class="info-item">
        <b>Comments</b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${downloads}
      </p>
    </div>
  </div>`;
      }
    );
    gallery.innerHTML = markup;
  }
};

form.addEventListener('submit', checkInput);
