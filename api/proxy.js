const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (req, res) => {
	let target = "";
	if (req.url.startsWith("/backend")) {
		target = "http://nexifytw.mynetgear.com:45000/api/Record/";
	}

	createProxyMiddleware({
		target,
		changeOrigin: true,
		pathRewrite: {
			"^/backend/": "",
		},
	})(req, res);
};
