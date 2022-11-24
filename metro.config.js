<<<<<<< HEAD
const { getDefaultConfig } = require('metro-config');
=======
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//   },
//   resolver: {
//     sourceExts: [
//       'js', // note this has to be defined first or you get an error
//       'json',
//       'jsx',
//       'mjs',
//       // required because the react-native cli ignores `resolverMainFields`
//       'ts',
//       'tsx',
//     ],
//   },
// };

const { getDefaultConfig } = require('metro-config');

>>>>>>> feature/KR-14
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
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
<<<<<<< HEAD
      sourceExts: [...sourceExts, 'svg', 'js',
        // note this has to be defined first or you get an error
        'json',
        'jsx',
        'mjs',
        //       // required because the react-native cli ignores `resolverMainFields`
        'ts',
        'tsx',
      ]
=======
      sourceExts: [...sourceExts, 'svg','js', 
      // note this has to be defined first or you get an error
            'json',
            'jsx',
            'mjs',
      //       // required because the react-native cli ignores `resolverMainFields`
            'ts',
            'tsx',
    ]
>>>>>>> feature/KR-14
    }
  };
})();