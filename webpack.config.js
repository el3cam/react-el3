const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // Importa CleanWebpackPlugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
const portfinder = require("portfinder");
const randomName = 'script-' + Math.random().toString(36).substring(7) + '.js';

module.exports = async (env, argv) => {
  
  const isDevelopment = argv.mode === "development";
  const defaultPort = 3000;

  const port = await portfinder.getPortPromise({
    port: defaultPort,
  });
  return {
    
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.js',

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: randomName,
    },
    stats: "none",
    devServer: {
      port: port,
      hot: true,
      open: true,
    },
    plugins: [
      new CleanWebpackPlugin(), // Agrega CleanWebpackPlugin aquí
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
          ],
        },
      ],
    },
  };
};
