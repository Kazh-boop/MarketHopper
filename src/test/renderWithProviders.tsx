import { render } from '@testing-library/react-native';
import React, { type ReactElement } from 'react';
import { PaperProvider } from 'react-native-paper';

import { SettingsProvider } from '@/context/SettingsContext';
import { getTheme } from '@/theme/theme';

/** Renders a component with the providers every screen relies on. */
export function renderWithProviders(ui: ReactElement) {
    return render(
        <SettingsProvider>
            <PaperProvider theme={getTheme('midnight')}>{ui}</PaperProvider>
        </SettingsProvider>,
    );
}
