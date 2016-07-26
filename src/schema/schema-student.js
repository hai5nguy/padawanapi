import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql/type'

export const StudentType = new GraphQLObjectType({
	name: 'Student',
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		status: { type: GraphQLString }
	})
})

const Queries = {
	student: {
		type: StudentType,
		args: {
			_id: { type: GraphQLID }
		},
		resolve: async (root, args) => {
			return { name: 'blah'}
		}
	}
}

const Mutations = {
	createStudent: {
		type: StudentType,
		args: {
			name: { type: GraphQLString }
		},
		resolve: async (root, args) => {
			return { _id: 'blah', name: args.name }
		}
	}
}

export default { Queries, Mutations }