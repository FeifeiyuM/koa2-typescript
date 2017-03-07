import * as Router from 'koa-router'
import * as Log4js from 'koa-log4'
import Account from './api'
import { userAuth } from '../utils/auth'
import { errAnal } from '../utils/error'

const router = new Router()

let account:any = null //account Object

const logger = Log4js.getLogger('account')

//init Account object
const initAccount = async (ctx, next) => {
	if(!account) {
		account = new Account()
		try {
			await account.init() //waiting to init finished
		} catch(err) {
			logger.error('account init failed')
		}
		await next()
	} else {
		await next()
	}
}
router.use(initAccount)
router.prefix('/account')

router.get('/info/:id', userAuth, async(ctx) => {
	let id = Number(ctx.params.id)
	let userInfo:any = null
	try {
		userInfo = await account.getById(id)
	} catch(err) {
		logger.error(err)
	}
	ctx.body = JSON.stringify(userInfo)
})

router.post('/login', async(ctx) => {
	let mobile:string = ctx.request.body.mobile
	let password:string = ctx.request.body.password 
	let userInfo:any = null
	try {
		userInfo = await account.login(mobile, password)
	} catch(err) {
		userInfo = err
		logger.error('router', err)
	}
	ctx.session.nick = userInfo.nick
	ctx.session.mobile = userInfo.mobile
	ctx.session.type = userInfo.type
	ctx.session.isLogin = true
	ctx.body = JSON.stringify(userInfo)
})

router.post('/register', async (ctx) => {
	let nick:string = ctx.request.body.nick
	let mobile:string = ctx.request.body.mobile
	let password:string = ctx.request.body.password
	let type:number = Number(ctx.request.body.type)
	let user = {
		nick: nick,
		mobile: mobile,
		password: password,
		type: type
	}
	let result:any = null
	try {
		result = await account.createUser(user)
		ctx.body = JSON.stringify(result)
	} catch(err) {
		logger.error('in error', err)
		errAnal(ctx, err)
	}
})

router.get('/logout', async (ctx) => {
	logger.debug('to logout')
	ctx.session = ''
	ctx.body = JSON.stringify({Status: 'logout'})
})

export default router