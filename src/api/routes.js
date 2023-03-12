import axios from 'axios';
import { getItemFromStorage, TOKEN_KEY } from '../utils/storage';

const LOCAL = process.env.REACT_APP_API_URL || '/api';

const http = axios.create();

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.status === 401) {
      window.location.replace('/auth/login');
    }
    return Promise.reject(error);
  },
);

const apiGetRequest = (url, config) => http.get(url, config);
const apiPostRequest = (url, data, config) => http.post(url, data, config);
const apiPutRequest = (url, data, config) => http.put(url, data, config);
const apiPatchRequest = (url, data, config) => http.patch(url, data, config);
const apiDeleteRequest = (url, config) => http.delete(url, config);

const authConfig = () => ({
  headers: { authorization: getItemFromStorage(TOKEN_KEY) },
});

const apiLocalGetRequest = (url) => apiGetRequest(`${LOCAL}/${url}`, authConfig());
const apiLocalPostRequest = (url, data) => apiPostRequest(`${LOCAL}/${url}`, data, authConfig());
const apiLocalPutRequest = (url, data) => apiPutRequest(`${LOCAL}/${url}`, data, authConfig());
const apiLocalPatchRequest = (url, data) => apiPatchRequest(`${LOCAL}/${url}`, data, authConfig());
const apiLocalDeleteRequest = (url) => apiDeleteRequest(`${LOCAL}/${url}`, authConfig());

export const sendLogin = (data) =>
  axios.post(`${LOCAL}/authentication`, { ...data, strategy: 'local' });
export const sendRegistration = (data) => axios.post(`${LOCAL}/register`, data);

export const getUser = () => apiLocalGetRequest(`users/me`).then((resp) => resp.data);

export const getArticles = () => apiLocalGetRequest(`blog-post`).then((resp) => resp.data);
export const getArticle = (id) => apiLocalGetRequest(`blog-post/${id}`).then((resp) => resp.data);
export const postArticle = (data) =>
  apiLocalPostRequest(`blog-post`, data).then((resp) => resp.data);
export const getArticleBlocks = (id) =>
  apiLocalGetRequest(`blog-post-block?blog_post_id=${id}`).then((resp) => resp.data);
export const postArticleBlock = (data) =>
  apiLocalPostRequest(`blog-post-block`, data).then((resp) => resp.data);
export const putArticleBlock = (id, data) =>
  apiLocalPutRequest(`blog-post-block/${id}`, data).then((resp) => resp.data);
export const patchArticleBlock = (id, data) =>
  apiLocalPatchRequest(`blog-post-block/${id}`, data).then((resp) => resp.data);
export const deleteArticleBlock = (id) =>
  apiLocalDeleteRequest(`blog-post-block/${id}`).then((resp) => resp.data);
