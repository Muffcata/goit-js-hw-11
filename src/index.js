import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchGallery } from './fetchGallery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const moreImages = document.querySelector('.load-more');
let page = 1;
let maxPages;
let previousName = '';

const placeImages = () => {
  fetchGallery(input.value, page)
    .then(res => {
      if (page <= 0) {
        gallery.innerHTML = '';
        moreImages.classList.add('hidden');
      } else if (page >= 1) {
        moreImages.classList.remove('hidden');
      }
      renderPhotos(res.hits, res.totalHits);
    })
    .then(() => new SimpleLightbox('.gallery a').refresh())
    .catch(error => console.log(error));
};

const renderPhotos = (elements, allHits) => {
  maxPages = allHits / 40;
  console.log('sumPages:', maxPages);
  if (page <= 1) {
    if (allHits < 0) {
      moreImages.classList.add('hidden');
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  }
  maxPages = allHits;
  if (maxPages <= 0) {
    moreImages.classList.add('hidden');
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notify.success(`Hooray! We found ${allHits} images.`);
  }

  console.log('Totalhits:', allHits);
  const markup = elements
    .map(
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
    )
    .join('');
  gallery.innerHTML = markup;
};

const firstCheck = e => {
  if (input.value !== previousName) {
    maxPages = 0;
    page = 1;
    searchImages(e);
  }
};

const searchImages = e => {
  e.preventDefault();
  gallery.innerHTML = '';
  placeImages();
  page += 1;
};

const loadMore = e => {
  searchImages(e);
};

form.addEventListener('submit', firstCheck);
moreImages.addEventListener('click', loadMore);
