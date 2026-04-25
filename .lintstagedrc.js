const path = require("path");

const checkTypesNextCommand = () => "yarn next:check-types";

module.exports = {
  "packages/nextjs/**/*.{ts,tsx}": [checkTypesNextCommand],
  "packages/{nextjs,hardhat}/**/*.{ts,tsx,sol}": [
    (filenames) =>
      `yarn prettier --write ${filenames.map((f) => `"${f}"`).join(" ")}`,
  ],
};
