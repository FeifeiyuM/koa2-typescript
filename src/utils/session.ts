import * as Uid from 'uid-safe'
import * as Log4js from 'koa-log4'
import RedisConn from './redis'

const logger = Log4js.getLogger('session')

class Session {
	redis: any
	constructor() {
		RedisConn(null).then(resp => {
			this.redis = resp
			logger.info('session: redis connect successfuly')
		}).catch((err) => {
			logger.error('session: redis connect failed', err)
		})
	}

	//Id generate
	getId(length:Number):string {
		return Uid.sync(length)
	}
	//Get Session in redis
	get(sid:string):Promise<any> {
		return this.redis.get(`session-${sid}`).then(resp => {
			try {
				return Promise.resolve(JSON.parse(resp))
			} catch(e) {
				return Promise.resolve({})
			}
		})
	}
	//Set Session in redis
	set(session, opts):Promise<any> {
		if(!opts.sid) {
			opts.sid = this.getId(24)
		}
		
		//write to redis as JSON
		return this.redis.set(`session-${opts.sid}`, JSON.stringify(session)).then(() => {
			return Promise.resolve(opts.sid)
		})
	}
	//Remove Session from redis
	destroy(sid:string):any {
		return this.redis.del(`session-${sid}`)
	}
}

export default Session
