const { Base64 } = require('js-base64');

const decode = (cursor) => {
	if (!cursor) return 0;

	const values = JSON.parse(Base64.decode(cursor));

	return { value: values.value, sortOrder: values.sortOrder, sortField: values.sortField };
};
const encode = ({ value, sortField, sortOrder }) => {
	return Base64.encode(JSON.stringify({ value, sortField, sortOrder }));
};

module.exports = { decode, encode };
