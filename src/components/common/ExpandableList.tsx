import React, { useState, type ReactElement } from 'react';
import { Button } from 'react-native-paper';

import { useTranslation } from '@/i18n/useTranslation';

interface ExpandableListProps<T> {
    data: readonly T[];
    /** Number of rows displayed while collapsed. */
    initialCount: number;
    renderItem: (item: T, index: number) => ReactElement;
}

/** Short list with a "Show all" toggle; avoids endless scrolling on detail screens. */
export function ExpandableList<T>({ data, initialCount, renderItem }: ExpandableListProps<T>) {
    const t = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const visible = isExpanded ? data : data.slice(0, initialCount);

    return (
        <>
            {visible.map(renderItem)}
            {data.length > initialCount ? (
                <Button
                    compact
                    icon={isExpanded ? 'chevron-up' : 'chevron-down'}
                    onPress={() => setIsExpanded((value) => !value)}
                >
                    {isExpanded ? t.common.showLess : t.common.showAll(data.length)}
                </Button>
            ) : null}
        </>
    );
}
