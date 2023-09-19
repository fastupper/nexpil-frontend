module.exports = {
    webpack: {
      configure: webpackConfig => {
        // Add the fallbacks:
        webpackConfig.resolve.fallback = { 
          "crypto": require.resolve("crypto-browserify"),
          "querystring": require.resolve("querystring-es3"),
          "stream": require.resolve("stream-browserify")
        };
        return webpackConfig;
      }
    }
  };