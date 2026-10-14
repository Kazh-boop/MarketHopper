import { translations } from '@/i18n/translations';

import { formatGil, formatNumber, formatRelativeTime } from './format';

const NOW = 1_700_000_000_000;
const MINUTE = 60_000;

describe('formatRelativeTime', () => {
    const t = translations.en;

    it.each([
        [0, 'just now'],
        [30_000, 'just now'],
        [5 * MINUTE, '5 min ago'],
        [3 * 60 * MINUTE, '3 h ago'],
        [24 * 60 * MINUTE, '1 day ago'],
        [3 * 24 * 60 * MINUTE, '3 days ago'],
    ])('%i ms ago → %s', (elapsed, expected) => {
        expect(formatRelativeTime(NOW - elapsed, t, NOW)).toBe(expected);
    });

    it('never returns a time in the future', () => {
        expect(formatRelativeTime(NOW + 10 * MINUTE, t, NOW)).toBe('just now');
    });

    it('is translated', () => {
        expect(formatRelativeTime(NOW - 2 * 24 * 60 * MINUTE, translations.fr, NOW)).toBe(
            'il y a 2 jours',
        );
    });
});

describe('formatGil', () => {
    it('formats with the locale grouping', () => {
        expect(formatGil(1234567, translations.en)).toBe('1,234,567 gil');
    });

    it('shows a dash for unknown values', () => {
        expect(formatGil(null, translations.en)).toBe('—');
    });
});

describe('formatNumber', () => {
    it('limits the fraction digits', () => {
        expect(formatNumber(41.4321, 'en-US', 1)).toBe('41.4');
    });
});
