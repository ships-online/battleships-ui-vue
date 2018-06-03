'use strict';

/* eslint-env node */

const webpack = require( 'webpack' );

module.exports = options => {
	const webpackConfig = {
		resolve: {
			modules: [ 'packages', process.cwd(), 'node_modules' ]
		},

		watch: options.watch,

		plugins: [
			new webpack.DefinePlugin( {
				'process.env': {
					'NODE_ENV': JSON.stringify( 'test' )
				}
			} ),
		],

		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: file => (
						/(node_modules\/((?!ckeditor|battleships)[a-z-]+))/.test( file ) &&
						!/\.vue\.js/.test( file )
					),
					loader: 'babel-loader',
					query: {
						cacheDirectory: true,
						plugins: [ require( 'babel-plugin-transform-es2015-modules-commonjs' ) ]
					}
				},
				{
					test: /\.vue$/,
					loader: 'vue-loader',
					options: {
						postcss: getPostCssPlugins( options )
					}
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: 'vue-style-loader',
						},
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: getPostCssPlugins( options )
							}
						}
					]
				},
				{
					test: /.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
					use: 'file-loader?name=[name]-[hash:6].[ext]'
				}
			]
		}
	};

	return webpackConfig;
};

function getPostCssPlugins( options ) {
	return [
		require( 'postcss-import' )(),
		require( 'postcss-nested' )(),
		...( options.minify ? [ require( 'cssnano' )() ] : [] )
	];
}
