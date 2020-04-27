const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 2020;
const routes = [
	{
		url: "/",
		template: "establishments",
	},
	{
		url: "/establishment",
		template: "establishment",
	},
	{
		url: "/login",
		template: "login",
	},
	{
		url: "/registration",
		template: "registration",
	},
	{
		url: "/profile",
		template: "profile",
	},
	{
		url: "/order",
		template: "order",
	},
	{
		url: "*",
		template: "establishments",
	},
];

app.use(express.static(path.join(__dirname, "./build")));

app.listen(port, () => console.log(`App listening on port: ${port}.`));

routes.forEach((route) => {
	app.get(route.url, (req, res) => {
		res.sendFile(path.join(__dirname, `./build/${route.template}.html`));
	});
});
