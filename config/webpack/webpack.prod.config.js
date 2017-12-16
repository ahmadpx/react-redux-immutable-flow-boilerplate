const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body',
  hot: true
})

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
})

const webpackConfig = {
  entry: [ // string | object | array
    './src/index'
  ],
  // Here the application starts executing
  // and webpack starts bundling
  
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, 'build'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    
    filename: 'js/[name].[hash].js' // string
    // the filename template for entry chunks
  },
  
  module: {
    // configuration regarding modules
    
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-2', 'react']
        }
      },
      
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          { // TODO dev only ( use extract text plugin for production )
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "postcss-loader" // Use postcss plugins
          }, {
            loader: "sass-loader", // compiles Sass to CSS
            options: {
              // Necessary for external CSS imports to work
              ident: 'postcss',
              plugins: [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ]
            }
          }
        ])
      }
    ]
  },
  
  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    // directories where to look for modules
    
    extensions: ['.js', '.json', '.jsx', '.css', '.scss']
    // extensions that are used
  },
  
  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory
  
  target: 'web', // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules
  
  stats: 'errors-only',
  // lets you precisely control what bundle information gets displayed
  
  plugins: [
    extractSass,
    HtmlWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = webpackConfig
