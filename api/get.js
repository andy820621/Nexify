import axios from "axios";
export default async (req, res) => {
	try {
		let data = await axios.get(
			"http://nexifytw.mynetgear.com:45000/api/Record/GetRecords"
		);
		console.log(data);
		res.status(200).json({
			body: data,
		});
	} catch (err) {
		res.send({ message: err });
	}
};
