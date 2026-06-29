import axios, { AxiosInstance } from 'axios';
import { XIVAPI_URL, UNIVERSALIS_URL } from '@/config/env';

/**
 * Factory pour créer des instances Axios configurées uniformément
 */
const createAxiosClient = (baseURL: string): AxiosInstance => {
    const instance = axios.create({
        baseURL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        paramsSerializer: {
            encode: (param) => {
                return encodeURIComponent(param).replace(/%7E/gi, '~');
            }
        }
    });

    instance.interceptors.request.use(
        (config) => {
            if (__DEV__) {
                const fullUrl = `${config.baseURL}${config.url}`;
                const params = config.params ? `?${new URLSearchParams(config.params).toString()}` : '';

                console.log(`[HTTP Outgoing] ${config.method?.toUpperCase()} -> ${fullUrl}${params}`);
            }
            return config;
        },
        (error) => Promise.reject(error)
    );


    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error(
                `[HTTP Error] URL: ${error.config?.url} | Status: ${error.response?.status} | Message: ${error.message}`
            );
            return Promise.reject(error);
        }
    );

    return instance;
};


export const xivapiClient = createAxiosClient(XIVAPI_URL);
export const universalisClient = createAxiosClient(UNIVERSALIS_URL);