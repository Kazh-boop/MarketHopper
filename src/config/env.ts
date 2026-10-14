/**
 * Runtime configuration, resolved from `EXPO_PUBLIC_*` environment variables.
 * See `.env.example` for the list of supported variables.
 */
export const IS_MOCK = process.env.EXPO_PUBLIC_MOCK === 'true';
export const XIVAPI_URL = process.env.EXPO_PUBLIC_XIVAPI_URL || 'https://v2.xivapi.com/api';
export const UNIVERSALIS_URL =
    process.env.EXPO_PUBLIC_UNIVERSALIS_URL || 'https://universalis.app/api/v2';
export const UNIVERSALIS_WEB_URL = 'https://universalis.app';
