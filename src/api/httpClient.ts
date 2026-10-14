import { create, type AxiosInstance } from 'axios';

import { UNIVERSALIS_URL, XIVAPI_URL } from '@/config/env';
import { logger } from '@/utils/logger';

import { toApiError } from './errors';

const REQUEST_TIMEOUT_MS = 10_000;

/** Creates an Axios instance sharing the same configuration and error normalisation. */
export function createHttpClient(baseURL: string): AxiosInstance {
    const instance = create({
        baseURL,
        timeout: REQUEST_TIMEOUT_MS,
        headers: { Accept: 'application/json' },
        // Strict RFC 3986 encoding (spaces as %20, not "+"), required by XIVAPI query strings.
        paramsSerializer: { encode: encodeURIComponent },
    });

    instance.interceptors.request.use((config) => {
        logger.debug(
            `[HTTP] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
            config.params ?? '',
        );
        return config;
    });

    instance.interceptors.response.use(
        (response) => response,
        (error: unknown) => {
            const apiError = toApiError(error);
            logger.warn(`[HTTP] ${apiError.kind} (${apiError.status ?? '-'}): ${apiError.message}`);
            return Promise.reject(apiError);
        },
    );

    return instance;
}

export const xivapiClient = createHttpClient(XIVAPI_URL);
export const universalisClient = createHttpClient(UNIVERSALIS_URL);
