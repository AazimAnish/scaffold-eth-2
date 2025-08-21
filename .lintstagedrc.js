const path = require("path");

const buildNextEslintCommand = (filenames) =>
  `bun run --cwd packages/nextjs lint --fix --file ${filenames
    .map((f) => path.relative(path.join("packages", "nextjs"), f))
    .join(" --file ")}`;

const checkTypesNextCommand = () => "bun run --cwd packages/nextjs check-types";

const buildHardhatEslintCommand = (filenames) =>
  `bun run --cwd packages/hardhat lint-staged --fix ${filenames
    .map((f) => path.relative(path.join("packages", "hardhat"), f))
    .join(" ")}`;

module.exports = {
  "packages/nextjs/**/*.{ts,tsx}": [
    buildNextEslintCommand,
    checkTypesNextCommand,
  ],
  "packages/hardhat/**/*.{ts,tsx}": [buildHardhatEslintCommand],
};
