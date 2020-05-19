const HtmlWebpackPlugin = require("html-webpack-plugin");

const favicon = "./source/media/favicon-rabbit.png";
const HtmlWebpackckPluginData = [
	{
		file: "establishments",
	},
	{
		file: "establishment",
	},
	{
		file: "login",
	},
	{
		file: "registration",
	},
	{
		file: "profile",
	},
	{
		file: "order",
	},
	{
		file: "orders",
	},
];

module.exports = [
	...HtmlWebpackckPluginData.map(
		(data) =>
			new HtmlWebpackPlugin({
				template: `./source/public/${data.file}.html`,
				favicon: favicon,
				filename: `./${data.file}.html`,
				chunks: ["common", data.file],
			})
	),
];
