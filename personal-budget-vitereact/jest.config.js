module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  setupFilesAfterEnv: ["./jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@mui/x-date-pickers(.*)$": "./node_modules/@mui/x-date-pickers$1",
    "^@mui/x-charts(.*)$": "./node_modules/@mui/x-charts$1",
  },
  testMatch: ["**/*.test.js", "**/*.test.jsx"],
  setupFilesAfterEnv: ["./src/setupTests.ts"],
};
