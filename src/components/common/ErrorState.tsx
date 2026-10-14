import React from 'react';
import { Button } from 'react-native-paper';

import { toApiError } from '@/api/errors';
import { useTranslation } from '@/i18n/useTranslation';

import { EmptyState } from './EmptyState';

interface ErrorStateProps {
    error: unknown;
    onRetry?: () => void;
}

/** Explains a failed request in plain words and offers to retry. */
export function ErrorState({ error, onRetry }: ErrorStateProps) {
    const t = useTranslation();
    const { kind } = toApiError(error);
    const icon = kind === 'network' ? 'wifi-off' : 'alert-circle-outline';

    return (
        <EmptyState
            icon={icon}
            title={t.errors.title}
            description={t.errors[kind]}
            action={
                onRetry ? (
                    <Button mode="contained-tonal" icon="refresh" onPress={onRetry}>
                        {t.common.retry}
                    </Button>
                ) : undefined
            }
        />
    );
}
