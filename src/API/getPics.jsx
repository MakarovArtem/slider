import axios from 'Axios';

export default async function getPics(picId = 1) {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${picId}`);
  return response;
}