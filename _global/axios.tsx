import axios from "axios";
import {EXCHANGERATES_API, EXCHANGERATES_ACCESS_KEY} from "@env";

const axiosInstance = axios.create();

axiosInstance.defaults.params = {};
axiosInstance.interceptors.request.use(function (config) {
    config.params['access_key'] = EXCHANGERATES_ACCESS_KEY;
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.defaults.baseURL = EXCHANGERATES_API;

export default axiosInstance;
