import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';


export const httpClient = {
    get: async <ResData>(url: string, config?: AxiosRequestConfig): Promise<ResData> => {
        try {
            const response = await axios.get<ResData>(url, config);
            return response.data;
        } catch (error) {
            handleHttpError(error);
            return undefined as never; // for TS' sake
        }
    },
    post: async <ResData = any, ReqData = any>(
        url: string,
        body?: ReqData,
        config?: AxiosRequestConfig
    ): Promise<ResData> => {
        // return axios.post<R>(url, body, config);
        try {
            const response = await axios.post<ResData, AxiosResponse<ResData>, ReqData>(url, body, config);
            return response.data;
        } catch (error) {
            handleHttpError(error);
            return undefined as never; // for TS' sake
        }
    }
};

const handleHttpError = (error: Error | AxiosError | unknown): never => {
    if (isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;

        switch (error.status) {
            case 404:
                throw new Error(`Resource not found: ${message}`);
            case 500:
                throw new Error(`Internal server error: ${message}`);
            default:
                throw new Error(`HTTP Error (${status}): ${message}`)
        }
    } else {
        throw new Error(`An unexpected error occurred: ${(error as Error).message}`);
    }
};
