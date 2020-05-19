module.exports = {
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
			test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
			loader: "url-loader",
			options: {
				limit: 10 * 1024,
				name: "./static/media/[name].[hash:8].[ext]",
			},
		},
		{
			test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
			loader: "file-loader",
			options: {
				name: "./static/media/[name].[hash:8].[ext]",
			},
		},
	],
};
