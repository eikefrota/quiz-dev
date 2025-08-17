import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.3:3000/api', // IP do servidor
});

export default api;

