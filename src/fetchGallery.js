const API_KEY = '33110181-05f7c31bd0648b87ed812e30c';

export function fetchGallery(newName) {
  return fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${newName}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}