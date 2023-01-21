import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = async (searchQuery, page) => {
  const response = await axios.get(`https://pixabay.com/api/`, {
    params: {
      key: '31604324-7a50cb95f9ef385a3991a2501',
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      page: page,
      per_page: 12,
      safesearch: true,
    },
  });
  return response.data;
};
