import RedisConn from './redis'

RedisConn(null).then(resp => {
	this.redis = resp
	console.log('session: redis connect successfuly')
}).catch((err) => {
	console.log('session: redis connect failed', err)
})

setTimeout(function() {
	RedisConn(null).then(resp => {
		this.redis = resp
		console.log('session: redis connect successfuly')
	}).catch((err) => {
		console.log('session: redis connect failed', err)
	})
}, 3000);

