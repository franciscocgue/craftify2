import axios from 'axios';

type config = {
    baseURL?: string,
}

export const httpClient = {
    get: <R>(url: string, config?: config) => {
        return axios.get<R>(url, config);
    },
    post: <B, R>(url: string, body?: B, config?: config) => {
        return axios.post<R>(url, body, config);
    }
};