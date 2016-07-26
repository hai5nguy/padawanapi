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
			token: { type: GraphQLString }
		},
		resolve: async (root, args) => {
			return { blah: 'blah'}
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
			return { blah: 'blah' }
		}
	}
}

export default { Queries, Mutations }