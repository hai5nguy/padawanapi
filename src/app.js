import express 		from 'express'
import graphqlHTTP 	from 'express-graphql'

const PORT 		= process.env.PORT 		|| 9000
const NODE_ENV	= process.env.NODE_ENV 	|| 'local'

var _listener

export default class App {

	static get listener() { return _listener }
	static set listener(l) { _listener = l }

	static async start() {
		await this.createApp()
		return this
	}

	static stop() {
		return new Promise((resolve, reject) => {
			this.listener.close(resolve)
		})
	}

	static createApp () {
		return new Promise((resolve, reject) => {
			var app = express()

			var l = app.listen(PORT, () => {
			    console.log(`=====> Padawan Api Server Online.  Port: ${PORT}.  Environment: ${NODE_ENV}`)
				this.listener = l
				resolve()
			})
		})
	}
}

