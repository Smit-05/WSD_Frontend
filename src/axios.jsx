import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:7116',
});

export default instance;