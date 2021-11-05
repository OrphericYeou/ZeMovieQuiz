import axios from 'axios';
import env from '../constants/env';
import * as Storage from '../helpers/storage';

// create an axios instance
const service = axios.create({
  baseURL: env.API_URL,
  withCredentials:true,
  timeout: 60000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
});

// request interceptor
service.interceptors.request.use(async config => {
  let access_token = await Storage.getItem(env.ACCESS_TOKEN);
  if (!!access_token) {
    config.headers['Authorization'] = 'Bearer ' + access_token;
  }

  return config;
}, error => {
  // handle request header errors
  return Promise.reject(error)
});

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return response.data;
    }
  },
  error => {
    console.log('ERROR ', error.response); // for debug
    return !!error.response && !!error.response.status && error.response.status === 422 ? error.response.data : Promise.reject(error);
  }
);

export default service;
