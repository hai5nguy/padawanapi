import express 		from 'express'
import graphqlHTTP 	from 'express-graphql'
import cors			from 'cors'

import schema 		from '~/schema/schema'
import Mongo 		from '~/backend/mongo'

const PORT 		= process.env.PORT 		|| 9000
const NODE_ENV	= process.env.NODE_ENV 	|| 'local'

var _listener


export default class App {

	static get listener() { return _listener }
	static set listener(l) { _listener = l }

	static async start() {
		await Mongo.connect()
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

			app.use('/graphql', cors(), graphqlHTTP((req, res) => {
				return {
					schema,
					graphiql: true
				}
			}))

			var l = app.listen(PORT, () => {
			    console.log(`=====> Padawan Api Server Online.  Port: ${PORT}.  Environment: ${NODE_ENV}`)
				this.listener = l
				resolve()
			})
		})
	}
}

