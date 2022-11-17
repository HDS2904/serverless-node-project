// const S3 = require("../services/S3");
const { v4 } = require("uuid");
const S3 = require("../services/S3");

const Responses = require("../API-Responses");
const pm = require("parse-multipart");

const bucketName = process.env.imageBucketName;
const typesFormat = ['jpeg', 'png', 'jpg'];

const uploadImage = async (event) => {
		if (!event.body) {
			return Responses._400({ message: 'No hay imagen que subir.' });
		}
		const { filename, data } = extractFile(event);

		let myFile = filename.split(".")
    const fileType = myFile[myFile.length - 1]
    const imageName = `${v4()}.${fileType}`

			if (!typesFormat.includes(fileType)) {
				return Responses._400({ message: 'formato invalido' });
			}

			const result = await S3.write(data, fileType, imageName, bucketName)
				.catch(err => {
					console.log("error al guardar imagen: ",err);
					return null;
				});

			if (!result) {
				return Responses._400({ message: error.message || 'failed to upload image' });
			}

			const url = `https://${bucketName}.s3.amazonaws.com/${imageName}`;

			return Responses._200({
				imageURL: url,
			});
};

const extractFile = (event) => {
	const boundary = pm.getBoundary(event.headers['content-type']);
	const files = pm.Parse(Buffer.from(event.body, 'base64'), boundary);
	const { filename, data } = files[0]
	return {
		filename,
		data
	};
} 

module.exports = {
	uploadImage
};