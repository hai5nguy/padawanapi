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
			console.log(res.body)

			var { _id, name } = res.body.data.createStudent

			CREATED_STUDENT_ID = _id

			assert(_id !== undefined, '_id should be defined')
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
		`)
		.end((err, res) => {
			console.log(res.body)
			var { _id, name } = res.body.data.student
			assert(_id !== undefined, '_id should be defined')
			assert(name === 'new student name', 'student name is suppose to be new student name')
			done()
		})
	})

	after(async (done) => {
		await TestServer.stop()
		done()
	})
})


