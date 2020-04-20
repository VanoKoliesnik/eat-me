module.exports = {
	historyApiFallback: {
		index: "index.html",
		rewrites: [
			{ from: /\/login/, to: "/login.html" },
			{ from: /\/registration/, to: "/registration.html" },
			{ from: /\/profile/, to: "/profile.html" },
			{ from: /\/order/, to: "/order.html" },
			{ from: /\/establishments/, to: "/establishments.html" },
			{ from: /\/establishment/, to: "/establishment.html" },
		],
	},
	liveReload: true,
	inline: true,
	port: 1337,
	hot: true,
};
