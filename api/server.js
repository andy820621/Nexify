const app = require("express")();
const axios = require("axios");

app.get("/api/GetRecords", async (req, res) => {
	try {
		let data = await axios.get(
			"http://nexifytw.mynetgear.com:45000/api/Record/GetRecords"
		);
		res.set("Access-Control-Allow-Origin", "*");
		res.send(data.data.Data);
	} catch (err) {
		res.send({ message: err });
	}
});

app.listen(3000, () => console.log(`Server us running on port 3000`));
