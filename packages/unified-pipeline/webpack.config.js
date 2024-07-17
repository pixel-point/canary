const prod = process.env.NODE_ENV === "production";

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const CONTEXT = process.cwd();

module.exports = {
  mode: prod ? "production" : "development",
  entry: "./src/bootstrap.tsx",
  context: CONTEXT,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.module\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "local",
                localIdentName: "[name]_[local]",
                exportLocalsConvention: "camelCaseOnly",
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [path.join(CONTEXT, "src")],
              },
              sourceMap: false,
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /(?<!\.module)\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [path.join(CONTEXT, "src")],
              },
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },
  devtool: prod ? undefined : "cheap-module-source-map",
  devServer: {
    hot: true,
    historyApiFallback: true,
    client: {
      overlay: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: "/",
      template: "index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_SHOW_TOGGLE": JSON.stringify(
        process.env.REACT_APP_SHOW_TOGGLE
      ),
    }),
  ],
};
