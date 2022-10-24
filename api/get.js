export default async (req, res) => {
	try {
		let data = await fetch(
			"http://nexifytw.mynetgear.com:45000/api/Record/GetRecords"
		);
		console.log(data);
		res.send(data);
	} catch (err) {
		res.send({ message: err });
	}
};
