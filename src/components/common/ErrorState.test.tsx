import { fireEvent, screen } from '@testing-library/react-native';
import React from 'react';

import { ApiError } from '@/api/errors';
import { translations } from '@/i18n/translations';
import { renderWithProviders } from '@/test/renderWithProviders';

import { ErrorState } from './ErrorState';

jest.mock('@/i18n/translations', () => {
    const actual = jest.requireActual('@/i18n/translations');
    return { ...actual, getDeviceLanguage: () => 'en' };
});

describe('ErrorState', () => {
    it('explains the error and retries on press', async () => {
        const onRetry = jest.fn();
        renderWithProviders(
            <ErrorState error={new ApiError('network', 'Network Error')} onRetry={onRetry} />,
        );

        expect(await screen.findByText(translations.en.errors.network)).toBeTruthy();
        fireEvent.press(screen.getByText(translations.en.common.retry));
        expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it('hides the retry button without handler', async () => {
        renderWithProviders(<ErrorState error={new Error('boom')} />);

        expect(await screen.findByText(translations.en.errors.unknown)).toBeTruthy();
        expect(screen.queryByText(translations.en.common.retry)).toBeNull();
    });
});
