var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = {
   entry: './main.js',
	
   output: {
      path:'./',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react']
            }
         },
		  {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract(
    "style",
    "css!sass")
 }
      ]
   },
    plugins: [
        new ExtractTextPlugin("main.css")
    ]
}

module.exports = config;