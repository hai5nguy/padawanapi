import { assert } from 'chai'

import { TestServer, sendGraph } from './test-server'

var CREATED_STUDENT_ID

describe('Padawan Api Unit Tests', () => {

	before(async (done) => {
		await TestServer.start()
		done()
	})

	it('should create a new student', (done) => {
		sendGraph(`
			mutation {
				createStudent (name: "new student name") {
					_id,
					name
				}
			}
		`).end((err, res) => {
			// console.log(res.body)

			var { _id, name } = res.body.data.createStudent

			CREATED_STUDENT_ID = _id

			assert(_id, '_id should exist')
			assert(name === 'new student name', 'name should be new student name')
			done()
		})
	})


	it('should return a student', (done) => {
		sendGraph(`
			query {
				student (_id: "${CREATED_STUDENT_ID}") {
					_id,
					name
				}
			}
		`).end((err, res) => {
			// console.log(res.body)
			var { _id, name } = res.body.data.student
			assert(_id, '_id should exist')
			assert(name === 'new student name', 'student name is suppose to be new student name')
			done()
		})
	})

	it('should return all students', (done) => {
		sendGraph(`
			query {
				students {
					_id
				}
			}
		`).end((err, res) => {
			// console.log(res.body.data.students)
			var { students } = res.body.data
			assert(students.length, 'students should not be an empty array')
			assert(students[0]._id, 'the first student _id should be defined')
			done()
		})
	})

	it('should update a student\'s name', (done) => {
		sendGraph(`
			mutation {
				updateStudent ( _id: "${CREATED_STUDENT_ID}", name: "name updated" ) {
					_id
					name
				}
			}
		`).end((err, res) => {
			// console.log(res.body)
			var { _id, name } = res.body.data.updateStudent
			assert(_id, 'id should exist')
			assert(name === 'name updated', 'name should say name updated')
			done()
		})
	})

	it('should delete a student', (done) => {
		sendGraph(`
			mutation {
				deleteStudent (_id: "${CREATED_STUDENT_ID}") {
					status
				}
			}
		`).end((err, res) => {
			// console.log(res.body)
			var { status } = res.body.data.deleteStudent
			assert(status === "DELETE_SUCCESS", 'status should say DELETE_SUCCESS')
			done()
		})
	})

	it('should delete all students', done => {
		sendGraph(`
			mutation {
				A: createStudent ( name: "student A") {
					_id, name
				}
				B: createStudent ( name: "student B") {
					_id, name
				}
				deleteAllStudents {
					status
				}
			}

		`).end((err, res) => {
			// console.log(res.body)
			var { status } = res.body.data.deleteAllStudents
			assert(status === 'DELETE_SUCCESS', 'status should be DELETE_SUCCESS')
			done()
		})
	})

	after(async (done) => {
		await TestServer.stop()
		done()
	})
})


