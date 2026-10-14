import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Icon fonts are considered loaded, so icons render synchronously in tests.
jest.mock('expo-font', () => ({
    ...jest.requireActual('expo-font'),
    isLoaded: () => true,
    loadAsync: jest.fn(() => Promise.resolve()),
}));
