import * as Log4js from 'koa-log4'
import InitModel from '../base/models'

const logger = Log4js.getLogger('test')

InitModel().then(db => {
	logger.debug('------inited-----', db.models)
}).catch(err => {
	logger.error('-------init failed------', err)
})