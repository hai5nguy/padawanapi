import { TestServer } from './test-server'

describe('Padawan Api Unit Tests', () => {

	before(async (done) => {
		await TestServer.start()
		done()
	})


	it('should do things', done => {

		done()
	})

	after(async (done) => {
		await TestServer.stop()
		done()
	})
})


