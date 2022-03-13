const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImage = ({ sourceStream }) => {
	return new Promise((resolve, reject) => {
		const destinationStream = cloudinary.uploader.upload_stream((error, image) => {
			if (image) {
				resolve(image);
			} else {
				reject(error);
			}

		});

		sourceStream.pipe(destinationStream);
	});
};

module.exports = {
	uploadImage,
};
