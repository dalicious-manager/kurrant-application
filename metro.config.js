const {getDefaultConfig} = require('metro-config');
module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [
        ...sourceExts,
        'svg',
        'js',
        // note this has to be defined first or you get an error
        'json',
        'jsx',
        'mjs',
        //       // required because the react-native cli ignores `resolverMainFields`
        'ts',
        'tsx',
      ],
    },
  };
})();
