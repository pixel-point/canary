const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

const path = require('path')

module.exports = {
  entry: 'src/index.tsx',
  mode: 'production',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'YamlEditor'
  },
  externals: {
    'monaco-editor-react': '@monaco-editor/react',
    'monaco-editor': 'monaco-editor',
    'monaco-yaml': 'monaco-yaml',
    react: 'react',
    'react-dom': 'react-dom',
    'monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js':
      'monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js',
    'monaco-editor/esm/vs/editor/standalone/browser/outlineModel.js':
      'monaco-editor/esm/vs/editor/standalone/browser/outlineModel.js',
    'monaco-editor/esm/vs/editor/standalone/browser/ILanguageFeaturesService.js':
      'monaco-editor/esm/vs/editor/standalone/browser/ILanguageFeaturesService.js'
  },
  resolve: {
    modules: [__dirname, 'src', 'node_modules'],
    extensions: ['.js', '.jsx', '.tsx', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json']
        },
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: ['file-loader']
      }
    ]
  }
}
