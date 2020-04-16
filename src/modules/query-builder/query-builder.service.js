const { decode } = require('../cursor/cursor.service');

module.exports = (query, { first, after, sortBy, sortOrder }) => {
	const limit = first > 20 || !first ? 10 : first;
	const sort = sortOrder === 'ASCENDING' ? 'asc' : 'desc';
	const sortingBy = sortBy || 'createdAt';

	query.sort({ [sortingBy]: sort }).limit(limit + 1);

	if (after) {
		const cursor = decode(after);
		if (cursor.sortOrder === 'asc') {
			query.gt([cursor.sortField], cursor.value);
		} else if (cursor.sortOrder === 'desc') {
			query.lt([cursor.sortField], cursor.value);
		}
	}
	return { query, limit, sort, sortingBy };
};
