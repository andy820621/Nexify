export default async (req, res) => {
	try {
		let data = await axios.get(
			"http://nexifytw.mynetgear.com:45000/api/Record/GetRecords"
		);
		res.set("Access-Control-Allow-Origin", "*");
		console.log(data);
		res.json(data);
	} catch (err) {
		res.send({ message: err });
	}
};
