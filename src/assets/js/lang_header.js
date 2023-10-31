import axios from 'axios';

const lang_header = axios.create({
  baseURL: 'https://api.egyptgamestore.com',
  headers: {
    'lang': 'ar',
    // Add other default headers here
  },
});

export default lang_header;
