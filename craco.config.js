const path = require('path');

// const VERSION = 'v1-1'; 
const PORT = process.env.PORT || 3005; 

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      if (!webpackConfig.ignoreWarnings) {
        webpackConfig.ignoreWarnings = [];
      }

      // webpackConfig.resolve.alias['@app'] = path.resolve(__dirname, `src/views/app/${VERSION}`);
      // webpackConfig.resolve.alias['@home'] = path.resolve(__dirname, `src/views/web/components`);
      webpackConfig.resolve.alias['@src'] = path.resolve(__dirname, `src`);
      webpackConfig.resolve.alias['@public'] = path.resolve(__dirname, `public`);

      // webpackConfig.resolve.fallback = {
      // };


       webpackConfig.entry = {
        main: path.resolve(__dirname, 'src/index.jsx'),
      };

      webpackConfig.output.publicPath = '/';

      return webpackConfig;
    },
  },
  devServer: {
    port: PORT,
    hot: true,  
  },
  cache: {
    type: 'filesystem',
  },
  style: {
    modules: {
      localIdentName: '[local]_[hash:base64:5]',
    },
  },
};


