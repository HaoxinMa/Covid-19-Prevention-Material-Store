// https://github.com/axios/axios
import _axios from "axios";

const axios = baseURL => {
  const instance = _axios.create({
    // baseURL: input parameter || default if without input parameter
    baseURL: baseURL || "http://localhost:3001",
    timeout: 1000, // the request will be aborted if it takes longer than 1000 ms
  });

  // Interceptor (verify JWT)
  instance.interceptors.request.use(
    config => {
      const jwToken = global.auth.getToken();
      config.headers.Authorization = "Bearer " + jwToken;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};

export default axios(); // export non-parameterized instance
export { axios }; // export parameterized instance
