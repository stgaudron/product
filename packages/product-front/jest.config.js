module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  transform: {
    // ...
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.svg$": "<rootDir>/svgTransform.js",
  },
  moduleFileExtensions: ["js", "json", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "product-front/src/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"],
};
