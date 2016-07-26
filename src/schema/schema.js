import { GraphQLSchema, GraphQLObjectType } from 'graphql/type'

import Student from './schema-student'

const query = new GraphQLObjectType({
	name: 'query',
	fields: {
		...Student.Queries
	}
})

const mutation = new GraphQLObjectType({
	name: 'mutation',
	fields: {
		...Student.Mutations
	}
})

export default new GraphQLSchema({ query, mutation })