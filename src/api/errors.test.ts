import { AxiosError, AxiosHeaders, type AxiosResponse } from 'axios';

import { ApiError, toApiError } from './errors';

function httpError(status: number): AxiosError {
    const response = {
        status,
        data: null,
        statusText: '',
        headers: {},
        config: { headers: new AxiosHeaders() },
    } as AxiosResponse;
    return new AxiosError('Request failed', 'ERR_BAD_RESPONSE', undefined, undefined, response);
}

describe('toApiError', () => {
    it.each([
        [404, 'notFound', false],
        [429, 'rateLimited', false],
        [503, 'server', true],
        [400, 'unknown', false],
    ] as const)('maps HTTP %i to %s', (status, kind, isRetryable) => {
        const error = toApiError(httpError(status));
        expect(error.kind).toBe(kind);
        expect(error.status).toBe(status);
        expect(error.isRetryable).toBe(isRetryable);
    });

    it('detects network failures (no response)', () => {
        expect(toApiError(new AxiosError('Network Error', 'ERR_NETWORK')).kind).toBe('network');
    });

    it('detects timeouts', () => {
        expect(toApiError(new AxiosError('timeout', 'ECONNABORTED')).kind).toBe('timeout');
    });

    it('returns ApiError instances unchanged', () => {
        const error = new ApiError('server', 'boom', 500);
        expect(toApiError(error)).toBe(error);
    });

    it('wraps unknown errors', () => {
        expect(toApiError(new Error('boom'))).toMatchObject({ kind: 'unknown', message: 'boom' });
    });
});
