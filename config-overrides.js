const webpack = require("webpack");
module.exports = function override(config) {
  config.resolve.fallback = {};

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser.js",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};
