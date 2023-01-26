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
        download,
      }) => {
        return `<div class="photo-card">
   <a href="${webformatURL}">
    <img src="${largeImageURL}" alt="${tags}" loading="lazy" /><a/>
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
        <b>Downloads</b>${download}
      </p>
    </div>
  </div>`.join('');
      }
    );
    gallery.innerHTML = markup;
  }
};
// const searchImages = () => {
//   const name = input.value;

// }
// const createMarkup = elements => {
//   elements.length

// }
// const inputValue = () => {
//   fetchGallery(input.value)
//     .then(newName => {
//       console.log(newName);
//     })
//     .catch(e => console.log('error', e));
// };

//   const markup = images.map({ webformatURL, largeImageURL, tags, likes, views, comments, download })=> {
//   return `<div class="photo-card">
//    <a href="${webformatURL}">
//     <img src="${largeImageURL}" alt="${tags}" loading="lazy" /><a/>
//     <div class="info">
//       <p class="info-item">
//         <b>Likes</b>${likes}
//       </p>
//       <p class="info-item">
//         <b>Views</b>${views}
//       </p>
//       <p class="info-item">
//         <b>Comments</b>${comments}
//       </p>
//       <p class="info-item">
//         <b>Downloads</b>${download}
//       </p>
//     </div>
//   </div>`
//       .join("");

form.addEventListener('submit', e => checkInput(e));
