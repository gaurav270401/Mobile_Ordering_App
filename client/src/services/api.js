// services/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mobile-ordering-app.vercel.app/',
  headers:{
    "Content-Type": "application/json"
}
});

export default instance;
