module.exports = {
	historyApiFallback: {
		index: "establishments.html",
		rewrites: [
			{ from: /^\/login$/, to: "/login.html" },
			{ from: /^\/registration$/, to: "/registration.html" },
			{ from: /^\/profile$/, to: "/profile.html" },
			{ from: /^\/order$/, to: "/order.html" },
			{ from: /^\/orders$/, to: "/orders.html" },
			{ from: /^\/establishments$/, to: "/establishments.html" },
			{ from: /^\/establishment$/, to: "/establishment.html" },
			{ from: /./, to: "/establishments.html" },
		],
	},
	liveReload: true,
	inline: true,
	port: 1337,
	hot: true,
};
