import * as orm from 'orm'
import config from '../../config/env.config'

let ormInst:any = null

const clientCreat = (opts, cb):void => {
	orm.connect(opts, (err, db):void => {
		if(err) {
			 cb(err, null)
		} else {
			cb(null, db)
		}
	})
}

const dbConn = (opts):Promise<any> => {
	let dbConf = opts || config.mysql
	if(ormInst) {
		return Promise.resolve(ormInst)
	} else {
		return new Promise((resolve, reject) => {
			clientCreat(dbConf, (err, conn) => {
				if(err) {
					reject(err)
				}
				ormInst = conn
				resolve(conn)
			})
		})
	}
}

export default dbConn