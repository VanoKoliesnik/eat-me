const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
	new HtmlWebpackPlugin({
		template: "./source/public/index.html",
		filename: "./index.html",
		chunks: ["common", "index"],
	}),
	new HtmlWebpackPlugin({
		template: "./source/public/establishments.html",
		filename: "./establishments.html",
		chunks: ["common", "establishments"],
	}),
	new HtmlWebpackPlugin({
		template: "./source/public/establishment.html",
		filename: "./establishment.html",
		chunks: ["common", "establishment"],
	}),
	new HtmlWebpackPlugin({
		template: "./source/public/login.html",
		filename: "./login.html",
		chunks: ["common", "login"],
	}),
	new HtmlWebpackPlugin({
		template: "./source/public/registration.html",
		filename: "./registration.html",
		chunks: ["common", "registration"],
	}),
	new HtmlWebpackPlugin({
		template: "./source/public/profile.html",
		filename: "./profile.html",
		chunks: ["common", "profile"],
	}),
	new HtmlWebpackPlugin({
		template: "./source/public/order.html",
		filename: "./order.html",
		chunks: ["common", "order"],
	}),
];
