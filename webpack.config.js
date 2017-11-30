const path = require('path');

module.exports = {
  entry: "./src/index", // string | object | array
  // Here the application starts executing
  // and webpack starts bundling
  
  output: {
    // options related to how webpack emits results
    
    path: path.resolve(__dirname, "build"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    
    filename: "index.js", // string
    // the filename template for entry chunks
    
    publicPath: "/public/assets/", // string
    // the url to the output directory resolved relative to the HTML page
    
    /* Advanced output configuration (click to show) */
  },
  
  module: {
    // configuration regarding modules
    
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["es2015", "stage-2", "react"]
        },
      },
      
      // {
      //   test: /\.html$/,
      //
      //   use: [
      //     // apply multiple loaders and options
      //     "htmllint-loader",
      //     {
      //       loader: "html-loader",
      //       options: {
      //         /* ... */
      //       }
      //     }
      //   ]
      // },
      
      {
        test: /\.scss$/,
        
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader",
          options: {
            includePaths: ["public/assets/scss", "src"]
          }
        }]
      },
    ],
    
  },
  
  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    // directories where to look for modules
    
    extensions: [".js", ".json", ".jsx", ".css"],
    // extensions that are used
  },
  
  performance: {
    hints: "warning", // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function (assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  
  devtool: "source-map", // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.
  
  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory
  
  target: "web", // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules
  
  stats: "errors-only",
  // lets you precisely control what bundle information gets displayed
  
  devServer: {
    // proxy: { // proxy URLs to backend development server
    //   '/api': 'http://localhost:3000'
    // },
    contentBase: path.join(__dirname, 'build'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },
}
