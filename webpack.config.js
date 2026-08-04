const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'genius-racer';
const isProd = process.env.NODE_ENV === 'production';
// For local development we need a root path (/), but for GitHub Pages deployment
// we should use a subfolder path such as /genius-racer/.
// You can override it later with PUBLIC_URL when you are ready to deploy.
const publicPath = process.env.PUBLIC_URL || (isProd ? `/${repoName}/` : '/');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    publicPath,
    clean: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg|mp3)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    hot: true
  }
};
