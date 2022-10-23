export default async (req, res) => {
	try {
		let data = await fetch(
			"http://nexifytw.mynetgear.com:45000/api/Record/GetRecords"
		);
		console.log(data);
		res.status(200).json({
			body: data,
		});
		return data;
	} catch (err) {
		res.send({ message: err });
	}
};
