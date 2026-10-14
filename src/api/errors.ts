import { isAxiosError } from 'axios';

export type ApiErrorKind =
    'network' | 'timeout' | 'notFound' | 'rateLimited' | 'server' | 'unknown';

/** Normalised error thrown by the data layer, so the UI never deals with Axios internals. */
export class ApiError extends Error {
    readonly kind: ApiErrorKind;
    readonly status: number | null;

    constructor(kind: ApiErrorKind, message: string, status: number | null = null) {
        super(message);
        this.name = 'ApiError';
        this.kind = kind;
        this.status = status;
    }

    /** Errors worth retrying automatically (transient failures). */
    get isRetryable(): boolean {
        return this.kind === 'network' || this.kind === 'timeout' || this.kind === 'server';
    }
}

export function toApiError(error: unknown): ApiError {
    if (error instanceof ApiError) {
        return error;
    }
    if (isAxiosError(error)) {
        if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
            return new ApiError('timeout', error.message);
        }
        const status = error.response?.status ?? null;
        if (status === null) {
            return new ApiError('network', error.message);
        }
        if (status === 404) {
            return new ApiError('notFound', error.message, status);
        }
        if (status === 429) {
            return new ApiError('rateLimited', error.message, status);
        }
        if (status >= 500) {
            return new ApiError('server', error.message, status);
        }
        return new ApiError('unknown', error.message, status);
    }
    return new ApiError('unknown', error instanceof Error ? error.message : String(error));
}
