import simpleRestProvider from "@refinedev/simple-rest";
import {DataProvider} from "@refinedev/core";
import {ApiClient} from "./lib/apiClient";

const API_URL = import.meta.env.VITE_API_URL;

const baseProvider = simpleRestProvider(API_URL, ApiClient);

export const customDataProvider: DataProvider = {
    ...baseProvider,

    getList: async ({ resource, pagination }) => {
        const current = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 10;

        const _start = (current - 1) * pageSize;
        const _end = current * pageSize;

        const response = await fetch(
            `${API_URL}/${resource}?_start=${_start}&_end=${_end}`
        );

        const result = await response.json();

        return {
            data: result.data,
            total: result.total,
        };
    },
};
