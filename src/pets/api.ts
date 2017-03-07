import * as Log4js from 'koa-log4'
import InitModels from '../base/models'

const logger = Log4js.getLogger('pets')

class Pets {
	petsM:any
	models:any
	constructor() {}

	init():Promise<any> {
		return new Promise((resolve, reject) => {
			InitModels().then(db => {
				logger.info('db connected sucessfully')
				this.petsM = db.models.pets
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
			this.petsM.get(id, (err, result) => {
				if(err) {
					reject(err)
				} else {
					logger.info('pets', JSON.stringify(result))
					resolve(result)
				}
			})
		})
	}

	// create(petInfo):
	
	owner(id:number):Promise<any> {
		return new Promise((resolve, reject) => {
			this.petsM.get(id, (err, pet) => {
				if(err) {
					reject(err)
				} else {
					logger.info('pets---', JSON.stringify(pet.baseInfo()))
					pet.getOwner((err, owner) => {
						if(err) {
							reject(err)
						} else {
							logger.debug('owner', JSON.stringify(owner.baseInfo()))
							resolve(owner.baseInfo())
						}
					})
				}
			})
		})
	}
	
	addOwner(id:number, ownerId:number):Promise<any> {
		return new Promise((resolve, reject) => {
			this.petsM.get(id, (err, pet) => {
				if(err) {
					reject(err)
				} else {
					pet.owner_id = ownerId
					pet.save((err, result) => {
						if(err) {
							reject(err)
						} else {
							resolve(result)
						}
					})
				}
			})
		})
	}
}

export default Pets