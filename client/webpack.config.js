const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "./"),
    // path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    // rules for modules (configure loaders, parser options, etc.)
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: 'babel-loader',
        // options: { presets: ["babel-preset-env", "react"] },
        // exclude: [/node_modules/],
        exclude: path.resolve(__dirname, "node_modules")
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, './')
  },
  devtool: "source-map",
  watch: true
};
