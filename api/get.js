import axios from "axios";

async function getData() {
	try {
		let data = await axios.get(
			"http://nexifytw.mynetgear.com:45000/api/Record/GetRecords"
		);
		return data;
	} catch (err) {
		return err;
	}
}

export default async (req, res) => {
	try {
		let data = await getData();
		console.log(data);
		res.status(200).json({
			body: data,
		});
	} catch (err) {
		res.send({ message: err });
	}
};
