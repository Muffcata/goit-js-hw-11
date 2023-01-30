import axios from 'axios';
const API_KEY = '33110181-05f7c31bd0648b87ed812e30c';

export async function fetchGallery(newName, page) {
  try {
    const response = await axios({
      method: 'get',
      url: `https://pixabay.com/api/?key=${API_KEY}&q=${newName}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`,
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}
