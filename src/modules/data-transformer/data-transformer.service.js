const { encode } = require('../cursor/cursor.service');
module.exports = ({ data, limit, sortOrder, sortBy }) => {
	if (data.length > 0) {
		const mainData = data.slice(0, limit);
		const hasNextPage = data.length > limit;
		const endCursor = encode({
			value: mainData[mainData.length - 1][sortBy],
			sortField: sortBy,
			sortOrder,
		});
		const edges = mainData.map((item) => {
			const cursor = encode({ value: item[sortBy], sortField: sortBy, sortOrder });
			const node = item;
			return { cursor, node };
		});
		return { edges, pageInfo: { endCursor, hasNextPage } };
	}
	return {
		pageInfo: { hasNextPage: false, endCursor: '' },
		edges: [],
	};
};
