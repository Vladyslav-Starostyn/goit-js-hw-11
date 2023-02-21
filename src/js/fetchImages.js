import axios from 'axios';

export const fetchImages = async (name, page, perPage) => {
  const baseURL = 'https://pixabay.com/api/';
  const key = '33817651-997e7e2cbe1c3994ebc4bd75c';
  try {
    const response = await axios.get(
      `${baseURL}?key=${key}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response.data;
  } catch (error) {
    console.log('ERROR' + error);
  }
};
