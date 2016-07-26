import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql/type'
import Mongo from '~/backend/mongo'
import { ObjectID } from 'mongodb'

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
			var student = await Mongo.Read('students', { _id: ObjectID(args._id) })
			return student
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
			var student = await Mongo.Create('students', { name: args.name })
			return student
		}
	}
}

export default { Queries, Mutations }