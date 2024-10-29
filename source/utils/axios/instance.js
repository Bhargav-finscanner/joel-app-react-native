import axios from 'axios';
const baseURL = 'https://digitalstout.me/';

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default instance;
