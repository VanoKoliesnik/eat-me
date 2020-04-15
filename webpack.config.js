const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		common: "./source/scripts/common.js",
		index: "./source/scripts/index.jsx",
	},
	output: {
		path: path.join(__dirname, "/build"),
		filename: "./scripts/[name][hash].js",
	},
	resolve: {
		extensions: [".jsx", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
					},
				],
			},
			{
				test: /\.less$/,
				loader: "less-loader",
				options: {
					javascriptEnabled: true,
				},
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: require.resolve("url-loader"),
				options: {
					limit: 10000,
					name: "/static/media/[name].[hash:8].[ext]",
				},
			},
			{
				test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
				loader: require.resolve("file-loader"),
				options: {
					name: "/static/media/[name].[hash:8].[ext]",
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./source/public/index.html",
			filename: "./index.html",
			chunks: ["common", "index"],
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, "source"),
		liveReload: true,
		inline: true,
		port: 1337,
		hot: true,
	},
};
