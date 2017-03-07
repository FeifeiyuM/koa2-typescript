import * as MigrateTask from 'migrate-orm2' 
import * as Log4js from 'koa-log4'
import DbConn from '../src/utils/orm'

const logger = Log4js.getLogger('migrate')

logger.info('to start migrate')
DbConn(null).then(conn => {
	logger.info('orm connect successfully')
	const task = new MigrateTask(conn.driver)
	// task.generate('test', (err, resp) => {
	// 	if(err) {
	// 		logger.error(err)
	// 	} else {
	// 		logger.debug('result' ,resp)
	// 	}
	// }
	// task.up('003-drop-column.js', (err, resp) => {
	// 	logger.info('----task up finished----')
	// 	if(err) {
	// 		logger.error(err)
	// 	} else {
	// 		logger.debug('result', resp)
	// 	}
	// })
	task.down('003-drop-column.js', (err, resp) => {
		logger.info('----task down finished----')
		if(err) {
			logger.debug(err)
		} else {
			logger.info('result', resp)
		}
	})
}).catch(err => {
	logger.error('orm connect failed')
})
