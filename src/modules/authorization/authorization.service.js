const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		req.isUserAuth = false;
		return next();
	}
	const token = authHeader.split(' ')[1];

	if (!token || token === '') {
		req.isUserAuth = false;
		return next();
	}
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		req.isUserAuth = false;
		return next(err);
	}
	if (!decodedToken) {
		req.isUserAuth = false;
		return next();
	}
	req.isUserAuth = true;
	req.userId = decodedToken.userId;
	next();
};
