module.exports = {
  presets: [['@vue/app', { useBuiltIns: 'entry' }]],
  plugins: [
    process.env.NODE_ENV === 'test'
      ? {}
      : [
          'component',
          {
            libraryName: 'element-ui',
            style: false,
          },
        ],
  ],
};
