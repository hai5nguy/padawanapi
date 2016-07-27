import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql/type'
import Mongo from '~/backend/mongo'
import { ObjectID } from 'mongodb'

import Testing from './testing'

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
			await Testing.sleep()
			var student = await Mongo.Read('students', { _id: ObjectID(args._id) })
			return student
		}
	},
	students: {
		type: new GraphQLList(StudentType),
		resolve: async (root, args) => {
			await Testing.sleep()
			var students = await Mongo.ReadMany('students')
			return students
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
	},
	deleteStudent: {
		type: StudentType,
		args: {
			_id: { type: GraphQLID }
		},
		resolve: async (root, args) => {
			var student = await Mongo.Delete('students', { _id: ObjectID(args._id) })
			return student
		}
	},
	deleteAllStudents: {
		type: StudentType,
		args: {
			_id: { type: GraphQLID }
		},
		resolve: async (root, args) => {
			var result = await Mongo.DeleteMany('students', {})
			return result
		}

	},
	updateStudent: {
		type: StudentType,
		args: {
			_id: { type: GraphQLID },
			name: { type: GraphQLString }
		},
		resolve: async (root, args) => {
			await Testing.sleep()
			var filter = { _id: ObjectID(args._id) }
			var value = { name: args.name }
			var student = await Mongo.Update('students', filter, value)
			return student
		}
	}
}

export default { Queries, Mutations }