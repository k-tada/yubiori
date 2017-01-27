const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  name: 'browser',
  devtool: 'source-map',
  context: path.join( __dirname, 'src' ),

  entry: {
    app: './client/app',
  },

  output: {
    path: path.join( __dirname, 'public', 'assets' ),
    filename: 'bundle.js',
    publicPath: 'assets/',
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: [ 'src', 'node_modules' ],
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      include: path.resolve(__dirname, './src'),
      exclude: /(node_modules|bower_components)/,
      loaders: [ 'babel' ]
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', [ 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss' ])
    },
    // {
    //   test: /\.png$/,
    //   loader: 'url-loader?limit=100000'
    // },
    // {
    //   test: /\.jpg$/,
    //   loader: 'url-loader?mimetype=image/jpg'
    // },
    ]
  },
  postcss: [
    require('postcss-nested'),
    require('postcss-simple-vars'),
    require('postcss-color-hex-alpha'),
    autoprefixer({ browsers: [ 'last 2 versions'  ] })
  ],
  plugins: [
    new ExtractTextPlugin('../assets/css/style.css', { allChunks: true }),
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom',
      'CSSModules': 'react-css-modules',
      'moment': 'moment',
      'axios': 'axios',
      'path': 'path',
    }),
  ],
}

