'use strict';

const webpack = require('webpack');
module.exports = {
  entry: {
    bundle: './dev/main.js'
  },
  output: { path: __dirname+'/front', filename: '[name].js' },
  plugins:[/*
    new webpack.optimize.UglifyJsPlugin({
		compress:{
			warnings:	false,
			drop_console:	true,
			unsafe:	true
		}
	})
*/	
 ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
		  plugins :[ /* ie8 */
			"transform-es3-member-expression-literals",
			"transform-es3-property-literals"
		  ]
        },
		
      }
    ]
  },
  devtool: "cheap-inline-module-source-map",
  watch:true
  };
