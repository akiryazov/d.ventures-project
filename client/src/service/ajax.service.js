import axios from 'axios';
import { BACKEND_URL } from 'config/config';

async function get(apiEndpoint) {
  try {
    const response = await axios.get(`${BACKEND_URL}${apiEndpoint}`);

    return response;
  } catch (error) {
    return error.response;
  }
}

async function post(apiEndpoint, body) {
  try {
    const response = await axios.post(`${BACKEND_URL}${apiEndpoint}`, body);

    return response;
  } catch (error) {
    return error.response;
  }
}

async function put(apiEndpoint, body) {
  try {
    const response = await axios.put(`${BACKEND_URL}${apiEndpoint}`, body);

    return response;
  } catch (error) {
    return error.response;
  }
}

async function deleteEntity(apiEndpoint) {
  try {
    const response = await axios.delete(`${BACKEND_URL}${apiEndpoint}`);

    return response;
  } catch (error) {
    return error.response;
  }
}

export default {
  get,
  post,
  put,
  deleteEntity
};