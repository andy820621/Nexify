export default async (req, res) => {
	try {
		let data = await axios.get(
			"http://nexifytw.mynetgear.com:45000/api/Record/GetRecords"
		);
		res.set("Access-Control-Allow-Origin", "*");
		res.send(data.data.Data);
	} catch (err) {
		res.send({ message: err });
	}
};
