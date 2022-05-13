import axios, { AxiosRequestConfig } from 'axios';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config: AxiosRequestConfig) => {
  if (config.headers !== undefined) {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  }
};

// для инстанса authHost добавляем интерцептор для запроса
// он будет отрабатывать перед каждым запросом и подставлять токен в heders.authorization

$authHost.interceptors.request.use(authInterceptor);
export { $host, $authHost };
