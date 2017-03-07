import * as Koa from 'koa'
import * as Log4js from 'koa-log4'
import * as Nunjucks from 'koa-nunjucks-promise'
import * as Path from 'path'
import * as Mount from 'koa-mount'
import * as Server from 'koa-static'
import * as BodyParser from 'koa-bodyparser'
import * as Session from 'koa-session2'
import Csrf from 'koa-csrf'

//Web Config
import config from '../config/env.config'
import SessionStore from './utils/session'
import InitModels from './base/models'

//Routers
//accout router 
import Base from './base/router'
import Account from './account/router'
import Pets from './pets/router'

const logger = Log4js.getLogger('app')
logger.info('---------Wellcome to Feifeiyu Web----------')
logger.info('                        _ooOoo_')
logger.info('                       o8888888o')
logger.info('                       88" . "88')
logger.info('                       (| -_- |)')
logger.info('                       O\  =  /O')
logger.info('                    ____/`---\'\____')
logger.info('                  .\'  \\|     |  `.')
logger.info('                 /  \\|||  :  |||  \\')
logger.info('                /  _||||| -:- |||||-  \\')
logger.info('                |   | \\\  -  / |   |')
logger.info('                | \_|  \'\'\---/\'\'  |   |')
logger.info('                \  .-\__  `-`  ___/-. /')
logger.info('              ___`. .\'  /--.--\  `. . __')
logger.info('           ."" \'<  `.___\_<|>_/___.\'  >\'"".')
logger.info('          | | :  `- \`.;`\ _ /`;.`/ - ` : | |')
logger.info('          \  \ `-.   \_ __\ /__ _/   .-` /  /')
logger.info('     ======`-.____`-.___\_____/___.-`____.-\'======')
logger.info('                        `=---=\'')
logger.info('    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
logger.info('                  佛祖保佑       永无BUG')

//Web init
const app = new Koa()

//Web Environment 
const isProdEnv:boolean = process.env.NODE_ENV === 'production'

//Nunjucks Template Engine config
app.use(Nunjucks(`${Path.resolve(__dirname, '..')}/views`, {
	ext: 'html',  //target file is html
	noCache: !isProdEnv,  //noCache in devlopment environment
	filter: {
		json: (str:string):string => {
			return JSON.stringify(str, null, 2)
		}
	},
	globals: {  // global variable in Template
		STATIC_URL: '/static'
	}
}))

//Static Path of Web
app.use(Mount('/static', Server(`${Path.resolve(__dirname, '..')}/public`)))

//http logs
app.use(Log4js.koaLogger(Log4js.getLogger('http'), {level: 'auto'}))

//Request Body Parse 
app.use(BodyParser())

//Session 
app.use(Session({
	key: 'feisession',
	store: new SessionStore(),
	maxAge: 3600000
}))

//request CSRF 
app.use(new Csrf({
	invalidSessionSecretMessage: 'Invalid session secret',
	invalidSessionSecretStatusCode: 403,
	invalidTokenMessage: 'Invalid CSRF token',
	invalidTokenStatusCode: 403,
	excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
	disableQuery: false
}))
app.use(async (ctx, next) => {
	if(ctx.method === 'GET') {
		ctx.cookies.set('csrftoken', ctx.csrf, {httpOnly: false})
	}
	await next()
})

app.use(Base.routes())
	.use(Base.allowedMethods())
	.use(Account.routes())
	.use(Account.allowedMethods())
	.use(Pets.routes())
	.use(Pets.allowedMethods())

app.listen(config.listenPort)
logger.info('[worker:%s] web server start listen on %s', process.pid, config.listenPort)

