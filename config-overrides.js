const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = function override(config) {
  config.resolve.fallback = {};

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser.js",
      Buffer: ["buffer", "Buffer"],
    })
  );

  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      // Increase the memory limit as needed, e.g., 4096MB (4GB)

      typescript: {
        typeCheck: {
          memoryLimit: 4096,
        },
      },
    })
  );

  return config;
};
