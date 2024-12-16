export const fetchImages = query => {
  const optionsObj = {
    key: '47662740-53400b40c2ec2ca1e86ebf909',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  const queryString = new URLSearchParams(optionsObj).toString();
  const baseUrl = 'https://pixabay.com/api/';
  const backUrl = `${baseUrl}?${queryString}`;

  return fetch(backUrl).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
