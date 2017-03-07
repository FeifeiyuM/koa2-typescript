//init models
import * as Log4js from 'koa-log4'
const logger = Log4js.getLogger('models')

import DbConn from '../utils/orm'
import { User } from '../account/models'
import { Pets } from '../pets/models'

let connection:any = null

const setUp = (db):void => {
	db.settings.set("instance.returnAllErrors", true)
	User(db)
	Pets(db)
}

const InitModels = ():Promise<any> => {
	if(connection && connection !== 'initing') {
		logger.info('models has been inited')
		return Promise.resolve(connection)
	} else {
		connection = 'initing'
		return new Promise((resolve, reject) => {
			DbConn(null).then(db => {
				setUp(db)
				logger.info('models inited successfuly')
				connection = db
				resolve(db)
			}).catch(err => {
				logger.info('models inited failed')
				reject(err)
			})
		})
	}
}

export default InitModels