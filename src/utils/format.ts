import type { Translation } from '@/i18n/translations';

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

const numberFormatters = new Map<string, Intl.NumberFormat>();

function getNumberFormatter(locale: string, maximumFractionDigits: number): Intl.NumberFormat {
    const key = `${locale}:${maximumFractionDigits}`;
    let formatter = numberFormatters.get(key);
    if (!formatter) {
        formatter = new Intl.NumberFormat(locale, { maximumFractionDigits });
        numberFormatters.set(key, formatter);
    }
    return formatter;
}

export function formatNumber(value: number, locale: string, maximumFractionDigits = 0): string {
    return getNumberFormatter(locale, maximumFractionDigits).format(value);
}

/** Formats a gil amount, or an em dash when unknown. */
export function formatGil(value: number | null, t: Translation): string {
    return value === null ? '—' : t.common.gil(formatNumber(value, t.locale));
}

/** Human friendly "time ago" (e.g. "5 min ago", "il y a 2 jours"). */
export function formatRelativeTime(timestamp: number, t: Translation, now = Date.now()): string {
    const elapsed = Math.max(0, now - timestamp);
    if (elapsed < MINUTE_MS) {
        return t.time.justNow;
    }
    if (elapsed < HOUR_MS) {
        return t.time.minutesAgo(Math.floor(elapsed / MINUTE_MS));
    }
    if (elapsed < DAY_MS) {
        return t.time.hoursAgo(Math.floor(elapsed / HOUR_MS));
    }
    return t.time.daysAgo(Math.floor(elapsed / DAY_MS));
}
