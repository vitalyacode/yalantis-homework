import axios from 'axios';

require('dotenv').config();

export const httpClient = axios.create({
  baseURL: 'https://yalantis-react-school-api.yalantis.com/api/v1',
  headers: { Authorization: process.env.REACT_APP_API_KEY },
});
