import React from 'react';
import { Chip } from 'react-native-paper';

import { useTranslation } from '@/i18n/useTranslation';
import type { MarketScope } from '@/types/settings';

interface MarketScopeChipProps {
    scope: MarketScope | null;
    onPress: () => void;
}

/** Shows which market prices come from; tapping it opens the market settings. */
export function MarketScopeChip({ scope, onPress }: MarketScopeChipProps) {
    const t = useTranslation();
    const label = scope
        ? `${t.home.marketLabel} : ${scope.name} · ${t.itemDetail.scopeKinds[scope.kind]}`
        : t.home.setupAction;

    return (
        <Chip
            icon="earth"
            mode="outlined"
            onPress={onPress}
            accessibilityLabel={`${label}. ${t.home.changeMarket}`}
            accessibilityHint={t.home.changeMarket}
        >
            {label}
        </Chip>
    );
}
