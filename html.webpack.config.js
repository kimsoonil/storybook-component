const SpritesmithPlugin = require('webpack-spritesmith');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require('glob');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

const viewPath = 'src/html/';
const files = glob.sync('src/html/*.html');
const htmlWebpackPlugins = files.map(
  (file) =>
    new HtmlPlugin({
      filename: file.replace(viewPath, ''),
      template: `${file}`,
      inject: 'body'
    })
);

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    index: './src/html/index.js'
  },
  output: {
    path: resolve('src/html/'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
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
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|jpeg|gif|svg|ttf|eof|woff(2)?)(\?.*)?$/,
        loader: 'file-loader'
      }
    ]
  },
  devServer: {
    static: viewPath,
    hot: true,
    // progress: true,
    host: 'localhost',
    historyApiFallback: {
      index: 'index.html'
    },
    open: true
  },

  plugins: [
    ...htmlWebpackPlugins,
    new SpritesmithPlugin({
      src: {
        cwd: 'src/html/img/icons/',
        glob: '*'
      },
      target: {
        image: 'src/html/img/sprite.png',
        css: 'src/html/scss/sprite-generated.scss'
      },
      apiOptions: {
        cssImageRef: 'sprite.png'
      },
      spritesmithOptions: {
        padding: 10
      }
    })
  ]
};
