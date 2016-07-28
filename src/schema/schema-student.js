import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql/type'
import Mongo from '~/backend/mongo'
import { ObjectID } from 'mongodb'

import Testing from './testing'

export const StudentType = new GraphQLObjectType({
	name: 'Student',
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: GraphQLString, description: 'name of student' },
		hometown: { type: GraphQLString, description: 'hometown of student' },
		status: { type: GraphQLString, description: 'status of student' }
	})
})

const Queries = {
	student: {
		type: StudentType,
		description: 'get a student',
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
		description: 'get the list of all students',
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
		description: 'create a student',
		args: {
			name: { type: GraphQLString, description: '(required) name of new student' },
			hometown: { type: GraphQLString, description: 'hometown of student' }
		},
		resolve: async (root, args) => {
			await Testing.sleep()
			var { name, hometown } = args
			var student = await Mongo.Create('students', { name, hometown })
			return student
		}
	},
	deleteStudent: {
		type: StudentType,
		description: 'delete a student',
		args: {
			_id: { type: GraphQLID, description: '(required) _id of student to delete' }
		},
		resolve: async (root, args) => {
			await Testing.sleep()
			var student = await Mongo.Delete('students', { _id: ObjectID(args._id) })
			return student
		}
	},
	deleteAllStudents: {
		type: StudentType,
		description: 'delete ALL students',
		resolve: async (root, args) => {
			await Testing.sleep()
			var result = await Mongo.DeleteMany('students', {})
			return result
		}

	},
	updateStudent: {
		type: StudentType,
		description: 'update a student',
		args: {
			_id: { type: GraphQLID, description: '(required) _id of student to update' },
			name: { type: GraphQLString, description: '(required) new name of student' }
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