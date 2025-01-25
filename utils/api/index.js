import axios from "axios";
import { __getToken, __getLocalToken } from "../localization";

// export const BASE_URL = "https://happy-family.in";
export const BASE_URL = "https://doctordekho.org/";

export function __apiHeader() {
    return {
        headers: {
            "Content-Type": "application/json",
            token: __getToken(),
        },
    };
}
export function __apiHeaderFormData() {
    return {
        headers: {
            "Content-Type": "multipart/form-data",
            token: __getToken(),
        },
    };
}
const __postLoginSigupApiData = async (endpoint, data) => {
    try {
        const response = await axios.post(`${BASE_URL}/${endpoint}`, data, {
            headers: {
                "Content-Type": "application/json",
                token: __getLocalToken(),
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const __getApiData = async (endpoint) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/${endpoint}`,
            __apiHeader()
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const __postApiDataFormData = async (endpoint, data) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/${endpoint}`,
            data,
            __apiHeaderFormData()
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
const __postApiMultiFileData = async (endpoint, data) => {
    try {
        const response = await axios.post(
            `${endpoint}`,
            data,
            __apiHeaderFormData()
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
const __postApiData = async (endpoint, data) => {
    console.log(__apiHeader());

    try {
        const response = await axios.post(
            `${BASE_URL}/${endpoint}`,
            data,
            __apiHeader()
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const __putApiData = async (endpoint, data) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/${endpoint}`,
            data,
            __apiHeader()
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const __deleteApiData = async (endpoint) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/${endpoint}`,
            __apiHeader()
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    __getApiData,
    __postApiData,
    __putApiData,
    __deleteApiData,
    __postLoginSigupApiData,
    __postApiDataFormData,
    __postApiMultiFileData,
};
