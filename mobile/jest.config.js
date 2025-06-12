module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(expo|@expo|expo-modules-core|expo-constants|expo-linking|react-native|@react-native|@react-navigation|expo-router|expo-asset)/)',
  ],
  moduleNameMapper: {
    '^@react-native-async-storage/async-storage$': '<rootDir>/src/__mocks__/AsyncStorage.ts',
  },
};
