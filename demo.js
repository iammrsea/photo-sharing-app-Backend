const { request } = require('graphql-request');

const query = `{
    users(sorting:{sortOrder:ASCENDING,sortBy:username}){
        pageInfo{
            hasNextPage
            endCursor
        }
        edges{
            cursor
            node{
                ...on User{
                    id
                    username
                    createdAt
                    email
                }
            }
        }
    }
}
`;
const url = 'http://localhost:5000/graphql';

request(url, query)
	.then((res) => {
		res.users.edges.forEach((edge) => console.log(edge.node));
	})
	.catch((e) => {
		console.log('error ', e);
	});
