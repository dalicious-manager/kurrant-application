module.exports = api => {
  const isProd = api.cache(() => process.env.NODE_ENV === 'production');
  api.cache(false);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-transform-destructuring',
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          allowUndefined: false,
        },
      ],
      [
        'babel-plugin-styled-components',
        {
          ssr: true,
          displayName: isProd ? false : true,
          fileName: isProd ? false : true,
          minify: isProd ? true : false,
          pure: true,
          transpileTemplateLiterals: false,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
          ],
          alias: {
            '~assets': './src/assets',
            '~biz': './src/biz',
            '~screens': './src/screens',
            '~pages': './src/pages',
            '~components': './src/components',
            '~hooks': './src/hooks',
            '~hook': './src/hook',
            '~utils': './src/utils',
            '~theme': './src/theme.js',
          },
        },
      ],
    ],
  };
};
