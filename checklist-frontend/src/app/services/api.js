import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
  },
  data: null,
});

api.interceptors.request.use(async config => {
  const token = localStorage.getItem('@authApp: token');
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return config;
});

/* Session Expired */
api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    localStorage.removeItem('@authApp: user');
    localStorage.removeItem('@authApp: token');
    window.location.pathname = '/expire'
  } else {
    return Promise.reject(error);
  }
});

/* Handle Error's */
api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (400 === error.response.status) {
    window.location.pathname = '/error'
  } else {
    return Promise.reject(error);
  }
});

/* Handle Offline */
api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(!error.response) {
    console.log('offline!');
    window.location.pathname = '/offline';
  } else {
    return Promise.reject(error);
  }
});

export default api;

/*
X-Powered-By: Express
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
Content-Type: application/json; charset=utf-8
Content-Length: 121
ETag: W/"79-snnE4Op9ns5Yq8LjeEjtkSlMwuQ"
Date: Sat, 05 Sep 2020 18:10:51 GMT
Connection: keep-alive
*/