import axios from 'Axios';

export default async function getPics(picLimit = 3) {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=${picLimit}`);
  return response;
}