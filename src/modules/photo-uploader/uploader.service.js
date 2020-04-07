const ImageKit = require('imagekit');

const imageKit = new ImageKit({
	publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
	urlEndpoint: `https://ik.imagekit.io/${process.env.IMAGEKIT_ID}/`,
});

const uploadImage = ({ file, fileName }) => {
	return imageKit.upload({
		file,
		fileName,
	});
};
const deleteImage = (fileId) => {
	return imageKit.deleteFile(fileId);
};
module.exports = {
	uploadImage,
	deleteImage,
};
