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

const searchImages = isFirtCheck => {
  fetchGallery(input.value, page)
    .then(res => {
      maxPages = Math.ceil(res.totalHits / 40);
      console.log('sumPages:', maxPages);
      if (res.totalHits === 0) {
        moreImages.classList.add('hidden');
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        if (isFirtCheck) {
          Notify.success(`Hooray! We found ${res.totalHits} images.`);
        }
        if (maxPages > 1) {
          moreImages.classList.remove('hidden');
        }
        if (page >= maxPages) {
          moreImages.classList.add('hidden');
          Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      }
      renderPhotos(res.hits);
    })
    .then(() => new SimpleLightbox('.gallery a').refresh())
    .catch(error => console.log(error));
};

const renderPhotos = elements => {
  const markup = elements
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
   <a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" width="300" height="265"loading="lazy" /></a>
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
  gallery.innerHTML += markup;
  if (page > 1) {
    const { height: cardHeight } = document
      .querySelector('.gallery .photo-card')
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
};

const firstCheck = e => {
  e.preventDefault();
  maxPages = 0;
  gallery.innerHTML = '';
  page = 1;
  searchImages(true);
};

const loadMore = () => {
  page += 1;
  searchImages(false);
};

form.addEventListener('submit', firstCheck);
moreImages.addEventListener('click', loadMore);
