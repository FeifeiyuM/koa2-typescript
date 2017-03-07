import * as Log4js from 'koa-log4'
import InitModels from '../base/models'

const logger = Log4js.getLogger('account')

enum UserType {
	super = 0,
	normal = 1,
	operator = 2
}

class Account {
	userM: any = null
	models: any = null
	constructor() {}
	
	init():Promise<any> {
		return new Promise((resolve, reject) => {
			InitModels().then(db => {
				logger.info('db connected sucessfully')
				this.userM = db.models.user
				this.models = db.models
				resolve(true)
			}).catch(err => {
				logger.error('db connected failed')
				reject(false)
			})
		})
	}
	
	getById(id:number):Promise<any> {
		return new Promise((resolve, reject) => {
			this.userM.get(id, (err, result) => {
				if(err) {
					reject(err)
				}
				resolve(result)
			})
		})
	}

	login(mobile:string, password:string):Promise<any> {
		return new Promise((resolve, reject) => {
			const loginTime = new Date().toISOString().slice(0, 19)
			this.userM.find({mobile: mobile, password: password}, (err, result) => {
				if(err) {
					reject(err)
				}
				if(result.length === 0) {
					reject({ERROR: 'user is not exist'})
				} else if(result.length > 1) {
					reject({error: 'too many results'})
				} else {
					//set login time
					result[0].last_login = loginTime
					result[0].save(err => {
						if(err) 
							logger.error(err)
					})
					resolve(result[0].baseInfo())
				}
			})
		})
	}

	createUser(userInfo):Promise<any> {
		return new Promise((resolve, reject) => {
			const createTime = new Date().toISOString().slice(0, 19)
			userInfo.update_time = createTime
			logger.debug('to create user', userInfo)
			this.userM.create(userInfo, (err, result) => {
				if(err) {
					reject(err) 
				}
				resolve(result)
			})
		})
	}
}

export default Account