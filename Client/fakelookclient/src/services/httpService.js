import axios from "axios";
import env from "../enviroments/enviroment";
import environment from "../enviroments/enviroment";

import jwtService from "./jwtService";

const axiosCreate = axios.create({ baseURL: environment.serverUrl });

axiosCreate.interceptors.request.use(
  config => {
    const token = jwtService.getAccessToken()
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

axiosCreate.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === `${environment.serverUrl}/api/auth/token`
    ) {
      window.location.replace(environment.clientUrl);
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = jwtService.getRefreshToken();
      return axiosCreate
        .post(env.serverUrl + "/api/auth/token", {
          refreshToken,
        })
        .then(res => {
          if (res.status === 201) {
            jwtService.setAccessToken(res.data);
            axiosCreate.defaults.headers.common["Authorization"] =
              "Bearer " + jwtService.getAccessToken();
            originalRequest.headers["Authorization"] = "Bearer " + jwtService.getAccessToken();
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

axiosCreate.interceptors.response.use(null, error => {
  const expectedError =
    error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", error);
  }

  return Promise.reject(error);
});

const methods = {
  get: axiosCreate.get,
  post: axiosCreate.post,
  put: axiosCreate.put,
  delete: axiosCreate.delete,
};

export default methods;
