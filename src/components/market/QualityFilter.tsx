import React from 'react';
import { SegmentedButtons } from 'react-native-paper';

import { useTranslation } from '@/i18n/useTranslation';
import type { Quality } from '@/types/market';

const QUALITIES: readonly Quality[] = ['all', 'nq', 'hq'];

interface QualityFilterProps {
    value: Quality;
    onChange: (quality: Quality) => void;
}

export function QualityFilter({ value, onChange }: QualityFilterProps) {
    const t = useTranslation();
    return (
        <SegmentedButtons
            value={value}
            onValueChange={(next) => onChange(next as Quality)}
            density="small"
            buttons={QUALITIES.map((quality) => ({
                value: quality,
                label: t.itemDetail.quality[quality],
            }))}
        />
    );
}
