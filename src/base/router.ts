import * as Router from 'koa-router'
import * as Log4js from 'koa-log4'

const logger = Log4js.getLogger('base')
const router = new Router()

router.get('/', async (ctx) => {
	logger.info('in index page')
	await ctx.render('base/index')
})

export default router