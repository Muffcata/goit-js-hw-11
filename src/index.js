import axios from 'axios';
// import { fetchGallery } from './fetchGallery';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const API_KEY = '33110181-05f7c31bd0648b87ed812e30c';

fetch(
  `https://pixabay.com/api/?key=${API_KEY}&q={newName}&image_type=photo&orientation=horizontal&safesearch=true`
)
  .then(r => r.json())

  .catch(e => console.log('error', e));
