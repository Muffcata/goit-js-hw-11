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

const checkInput = e => {
  e.preventDefault();
  fetchGallery(input.value, page)
    .then(res => {
      renderPhotos(res.hits, res.totalHits);
      page += 1;
    })
    .then(() => new SimpleLightbox('.gallery a').refresh())
    .catch(error => {
      console.log(error);
    });
};

const renderPhotos = (elements, allHits) => {
  maxPages = allHits / 40;
  if (maxPages > 1) {
    moreImages.classList.remove('hidden');
  } else if (page <= 1) {
    gallery.innerHTML = '';
    if (allHits <= 0) {
      moreImages.classList.add('hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  }
  if (page <= 1) {
    maxPages = allHits;
    if (allHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      moreImages.classList.add('hidden');
    } else {
      Notify.success(`Hooray! We found ${allHits} images.`);
    }
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

const loadMore = () => {
  page += 1;
  checkInput();
};

form.addEventListener('submit', checkInput);
moreImages.addEventListener('click', loadMore);
