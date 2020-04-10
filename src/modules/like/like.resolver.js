module.exports = {
	Mutation: {
		createLike(_, { like }, { services: { likeService } }) {
			return likeService.createLike(like);
		},
		deleteLike(_, { id }, { services: { likeService } }) {
			return likeService.deleteLike(id);
		},
	},
	Query: {
		like(_, { id }, { loaders: { likeLoaders } }) {
			return likeLoaders.load(id);
		},
	},
	Like: {
		likerId(root, _, __) {
			console.log('like root', root);
			return root.liker;
		},
	},
};
