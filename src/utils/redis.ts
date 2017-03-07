import * as ioredis from 'ioredis'
import config from '../../config/env.config'

let redisInst:any = null
console.log('---------init------------')

const clientCreate = (opt, cb):void => {
	const redis = new ioredis(opt)
	redis.on('connect', ():void => {
		cb(null, redis)
	})
	redis.on('error', (err):void => {
		cb(err, null)
	})
}

const redisConn = (opt):Promise<any> => {
	let redisConf = opt || config.redis
	if(redisInst) {
		return Promise.resolve(redisInst)
	} else {
		return new Promise((resolve, reject) => {
			clientCreate(redisConf, (err, conn) => {
				if(err) {
					reject(err)
				}
				redisInst = conn
				resolve(conn)
			})
		})
	}
}

export default redisConn