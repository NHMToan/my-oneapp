const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = function override(config) {
  config.resolve.fallback = {
    process: require.resolve("process/browser"),
    zlib: require.resolve("browserify-zlib"),
    stream: require.resolve("stream-browserify"),
    util: require.resolve("util"),
    buffer: require.resolve("buffer"),
    asset: require.resolve("assert"),
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser.js",
      Buffer: ["buffer", "Buffer"],
    })
  );

  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        memoryLimit: 8192,
      },
    })
  );

  return config;
};
