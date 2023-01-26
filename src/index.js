import axios from 'axios';
const API_KEY = '33110181-05f7c31bd0648b87ed812e30c';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');

fetch(
  `https://pixabay.com/api/?key='33110181-05f7c31bd0648b87ed812e30c'&q=flower`
)
  .then(r => r.json())
  .then(r => console.log(r))
  .catch(e => console.log('error', e));
