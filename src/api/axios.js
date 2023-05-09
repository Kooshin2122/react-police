import axios from "axios";
import jsog from "jsog";

import { endpoint } from "./endpoints";

export const apiInstance = axios.create({
  baseURL: endpoint,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  function (response) {
    response.data = jsog.decode(response.data);

    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);
