import { QueryClient } from '@tanstack/react-query';

import { toApiError } from './errors';

const MAX_RETRIES = 2;

export function createQueryClient(): QueryClient {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // Only transient failures are retried; a 404 will not fix itself.
                retry: (failureCount, error) =>
                    failureCount < MAX_RETRIES && toApiError(error).isRetryable,
                staleTime: 60_000,
            },
        },
    });
}

export const queryKeys = {
    itemSearch: (query: string, language: string) => ['items', 'search', language, query] as const,
    marketData: (itemId: number, scopeTarget: string) => ['market', scopeTarget, itemId] as const,
};
