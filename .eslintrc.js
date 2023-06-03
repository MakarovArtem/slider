module.exports = {
  "env": {
      "browser": true,
      "es2021": true
  },
  "plugins": [
    "prettier",
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
  ],
  "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
  },
  "rules": {
    "react/prop-types": "off",
  },
}