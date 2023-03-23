module.exports = {
  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
  trailingComma: 'all',
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindConfig: './tailwind.config.cjs',
};
