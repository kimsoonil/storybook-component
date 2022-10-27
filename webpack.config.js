const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LoadablePlugin = require('@loadable/webpack-plugin');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}
const publicDir = path.resolve(__dirname, './public');
const APPLICATION_PHASE = process.env.APPLICATION_PHASE || 'REAL';
const IS_LOCAL = APPLICATION_PHASE === 'LOCAL';
const mode = IS_LOCAL ? 'development' : 'production';
// const target = 'web';
// const version = `${process.env.npm_package_version || '0.0.0'}.${process.env.npm_package_qaVersion || '0'}`;

const isAnalyze = process.argv.includes('--analyze');

module.exports = {
  // entry: {
  //   app: './src/index.js'
  // },
  module: {
    optimization: {
      splitChunks: {
        // 모든 유형의 청크를 포함합니다.
        chunks: 'all'
      }
    },
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        exclude: [resolve('src/views/Admin')]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          mode === 'development'
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '/'
                }
              },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpeg|gif|svg|ttf|eof|woff(2)?)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          publicPath: '/'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${publicDir}/index.html`,
      filename: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
    new LoadablePlugin()
  ]
};
