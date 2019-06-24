module.exports = {
  'src/**/*.{js,jsx,tsx,ts}': ['eslint --fix', () => 'tsc --noEmit -p tsconfig.json'],
  'src/**/*.{js,jsx,ts,tsx,html,css,less,md}': 'prettier --write',
};
