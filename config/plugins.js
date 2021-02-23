const HtmlWebpackPlugin = require("html-webpack-plugin");

const favicon = "./source/media/favicon-rabbit.png";
const HtmlWebpackPluginData = [
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
	{
		file: "order-print",
		entry: "orderPrint",
	},
];

module.exports = [
	...HtmlWebpackPluginData.map(
		(data) =>
			new HtmlWebpackPlugin({
				template: `./source/public/${data.file}.html`,
				favicon: favicon,
				filename: `./${data.file}.html`,
				chunks: ["common", "background", data.entry ? data.entry : data.file],
			})
	),
];
