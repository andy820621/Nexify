import request from "request";

export default (req, res) => {
	let prefix = "/backend";
	if (!req.url.startsWith(prefix)) {
		return;
	}
	let target =
		"http://nexifytw.mynetgear.com:45000/api/Record/" +
		req.url.substring(prefix.length);

	var options = {
		method: "GET",
		url: target,
		headers: {
			"Notion-Version": res.headers["notion-version"],
			Authorization: res.headers["authorization"],
		},
	};
	request(options, function (error, response) {
		if (error) throw new Error(error);
		res.writeHead(200, { "Content-Type": "application/json" });
		res.write(response.body);
		res.end();
	});
};
