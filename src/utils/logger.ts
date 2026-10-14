/* eslint-disable no-console */

/** Minimal logger: debug output is only emitted in development builds. */
export const logger = {
    debug: (...args: unknown[]): void => {
        if (__DEV__) {
            console.log(...args);
        }
    },
    warn: (...args: unknown[]): void => console.warn(...args),
    error: (...args: unknown[]): void => console.error(...args),
};
