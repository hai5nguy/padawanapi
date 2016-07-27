import { MongoClient, ObjectID } from 'mongodb'

var PADAWAN_MONGO_CONNECTION_STRING = process.env.PADAWAN_MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/padawan'

var _db

const connect = async () => {
	try {
		_db = await MongoClient.connect(PADAWAN_MONGO_CONNECTION_STRING)
	    console.log('=====> Connected to mongo server:', PADAWAN_MONGO_CONNECTION_STRING);
	} catch (err) {
	    console.error('Unable to connect to mongo server.')
	}
}


const Create = async (collection, value) => {
	var r = await _db.collection(collection).insertOne(value)
	var i = await _db.collection(collection).find({ _id: r.insertedId }).toArray()
	return i[0]
}


const Read = async (collection, filter) => {
	var r = await _db.collection(collection).find(filter).toArray()
	return r[0]
}

const ReadMany = async (collection, filter) => {
	return await _db.collection(collection).find(filter).toArray()
}


const Update = async (collection, filter, value) => {
	if (typeof collection !== 'string') throw 'DB.Update error: collection name must be a string'

	var doc = await _db.collection(collection).findOneAndUpdate(filter, { $set: value }, { upsert: true })

	if (doc.lastErrorObject.updatedExisting) {
		return (await _db.collection(collection).find({ _id: doc.value._id }).toArray())[0]
	}

	if (doc.value) {
		return doc.value
	} else {
		return (await _db.collection(collection).find({ _id: doc.lastErrorObject.upserted }).toArray())[0]
	}

}


const Delete = async (collection, filter) => {
	var r = await _db.collection(collection).deleteOne(filter)

	if (r.deletedCount === 1) {
		return { status: 'DELETE_SUCCESS' }
	} else {
		return { status: 'DELETE_FAIL' }
	}
}

const DeleteMany = async (collection, filter) => {
	var r = await _db.collection(collection).deleteMany(filter)
	if (r.result.ok === 1) {
		return { status: 'DELETE_SUCCESS' }
	} else {
		return { status: 'DELETE_FAIL' }
	}
}

export default { connect, Create, Delete, DeleteMany, Read, ReadMany, Update }

