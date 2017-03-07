import * as Router from 'koa-router'
import * as Log4js from 'koa-log4'
import Pets from './api'

const logger = Log4js.getLogger('pets')
const router = new Router()
let pets:any = null //pet object

//init Pets object
const initPets = async (ctx, next) => {
	if(!pets) {
		pets = new Pets()
		try {
			await pets.init() //waiting to init finished
		} catch(err) {
			logger.error('pets init failed')
		}
		await next()
	} else {
		await next()
	}
}

router.use(initPets)
router.prefix('/pets')

router.get('/info/:id', async(ctx) => {
	let id:number = Number(ctx.params.id)
	let petInfo:any = null
	try {
		petInfo = await pets.getById(id)
	} catch(err) {
		logger.error(err)
		petInfo = err
	}
	ctx.body = JSON.stringify(petInfo)
})

router.get('/owner/:id', async(ctx) => {
	let id:number = Number(ctx.params.id)
	let ownerInfo:any = null
	try {
		ownerInfo = await pets.owner(id)
	} catch(err) {
		logger.error(err)
		ownerInfo = err
	}
	ctx.body = JSON.stringify(ownerInfo)
})

router.post('/owner/:id', async(ctx) => {
	let id:number = Number(ctx.params.id)
	let ownerId:number = Number(ctx.request.body.owner)
	let result:any = null
	try {
		result = await pets.addOwner(id, ownerId)
	} catch(err) {
		result = err
	}
	ctx.body = JSON.stringify(result)
})

export default router