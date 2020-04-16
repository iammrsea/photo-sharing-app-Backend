const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImage = ({ sourceStream }) => {
	return new Promise((resolve, reject) => {
		const destinationStream = cloudinary.uploader.upload_stream((error, image) => {
			if (error) reject(error);
			resolve(image);
		});

		sourceStream.pipe(destinationStream);
	});
};

module.exports = {
	uploadImage,
};
