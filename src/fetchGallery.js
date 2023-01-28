import axios from 'axios';
const API_KEY = '33110181-05f7c31bd0648b87ed812e30c';
let page = 1;
// export function fetchGallery(newName) {
//   return fetch(
//     `https://pixabay.com/api/?key=${API_KEY}&q=${newName}&image_type=photo&orientation=horizontal&safesearch=true&${params}`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
export async function fetchGallery(newName, page) {
  try {
    const response = await axios({
      method: 'get',
      url: `https://pixabay.com/api/?key=${API_KEY}&q=${newName}&image_type=photo&orientation=horizontal&safesearch=true${page}&per_page=40,`,
    });
    console.log(response);
  } catch (error) {
    console.log(error.message);
  }
}
