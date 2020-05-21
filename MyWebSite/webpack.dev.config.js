const path = require('path');
const CleanWebpackPlugin = require('Clean-Webpack-Plugin'); // npm i clean-webpack-plugin --save-dev

const WebpackShellPlugin = require('webpack-shell-plugin'); // to execute post build scripts

//const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // npm install -D mini-css-extract-plugin

//const HtmlWebpackPlugin = require('html-webpack-plugin'); // npm i -D html-webpack-plugin

//var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //npm install --save-dev optimize-css-assets-webpack-plugin
//const CopyWebpackPlugin = require('copy-webpack-plugin'); //npm i -D copy-webpack-plugin




module.exports = {
	context: path.resolve(__dirname, 'wwwroot-src/bundle/'), // __dirname is the directory of this file

	entry: {
		'index': './index.js'
	},

	output: {
		filename: 'js/site.js',
		path: path.resolve(__dirname, 'wwwroot/'), //__dirname is this file location
		publicPath: '/'
	},

	mode: 'development',

	optimization: {
		minimize: false
	//	splitChunks: {
	//		cacheGroups: {
	//			commons: {
	//				//test: /[\\/]node_modules[\\/]/,
	//				name: 'common',
	//				chunks: 'all'
	//			}
	//		}
	//	}
	},

	module:
	{
		rules:
			[
				
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
					// npm install --save-dev css-loader style-loader
				}
				,
				{
					//'style-loader', 
					test: /\.scss$/,
					use: ['style-loader','css-loader', 'sass-loader']
					//$ npm install sass-loader node-sass --save-dev
				}
				,
				{
					// npm install babel-loader babel-core babel-preset-env
					//npm install --save-dev babel-preset-stage-0
					test: /\.js$/,
					exclude: '/node_modules/',
					use:
					{
						loader: 'babel-loader',
						options:
						{
							minified : false,
							plugins:
								['transform-class-properties'// npm install babel-loader babel-core babel-plugin-transform-class-properties --save-dev

								],
							presets:// a preset is a collection of several babel plugins used together
								[
									'env', //npm install babel-preset-env --save-dev
									// all properties in the latest Ecma script specs

									'stage-0' // all the newest features which are not included in the offecial specs yet
									// npm install -D babel-preset-stage-0

								]
						}
					}

				}
				,
				{
					test: /^.*$/, // all files
					use:
						[
							{
								loader: 'file-loader', // this loader instruct webpack to copy the input file to the output folder. 
								//npm install file-loader --save-dev
								options:
								{
									name: '/[path][name].[ext]',
									context: ''
								}
							}
						]
				}
				
				,

			]
	}
	,
	plugins:
		[
			new CleanWebpackPlugin(
				['wwwroot'] // you can pass an array of more that one directory anywhere inside the directory structure of the project
			)
				,
				new WebpackShellPlugin({onBuildStart:['echo "Webpack Started ....."'], onBuildEnd:['postscript.bat']})
      ,
			//new OptimizeCssAssetsPlugin(),

			// new MiniCssExtractPlugin(
			// 	{
			// 		filename: '[name].css' // the file name of the produced css file
			// 	}),

			// //generating html file from "scratch"
			//new HtmlWebpackPlugin(// npm i -D html-webpack-plugin
			//	{
			//		title: 'Hello world',
			//		filename: 'index.html',
			//		meta:
			//		{
			//			viewport: 'width=device-width, intial-scale=1'
			//		}
			//	},

			//new HtmlWebpackPlugin(
			//	{
			//		inject: false, // instructs the plugin to place your bundles at the bottom of the body tag
			//		template: './Home_Layout.cshtml_template', //relative to the context path
			//		filename: '../Views/Home/_About.cshtml' // output file (this path is relative to the output path)
			//	})


			//new CopyWebpackPlugin(
			//	[
			//		{
			//			from: '_Layout.cshtml',
			//			to: 'Views/Shared/_LayoutTemplate.cshtml'
			//		}
			//	]

			//)

		]
}