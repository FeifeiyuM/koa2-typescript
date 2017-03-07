import * as Log4js from 'koa-log4'
const logger = Log4js.getLogger('test')

import DbConn from '../utils/orm'
let User:any = null

DbConn(null).then(db => {
	logger.info('db connected sucessfully')
	const pets = db.define('pets', {
		id: {type: 'serial', key: true},
		gender: {type: 'enum', values: ['male', 'female'], required: true},
		nick: {type: 'text', size: 100},
		breed: {type: 'text', size: 100}
	},{
		methods: {
			baseInfo() {
				return {
					nick: this.nick,
					gender: this.gender,
					breed: this.breed
				}
			}
		}
	})
	const user = db.define('user', {
		id: {type: 'serial', key: true},
		password: {type: 'text', size: 128, required: true},
		type: {type: 'integer', size: 0|1, defaultValue: 0},
		nick: {type: 'text', size: 30, required: true},
		mobile: {type: 'text', size: 20, required: true},
		last_login: {type: 'date', time: true},
		create_time: {type: 'date', time: true, required: true},
		update_time: {type: 'date', time: true, required: true}
	})
	// logger.debug('db.models', db.models)
	pets.hasOne('owner', db.models.user)
	let dog = {
		nick: 'lucy',
		gender: 'female',
		breed: 'dog'
	}
	// pets.create(dog, (err, result) => {
	// 	if(err) {
	// 		logger.error('ERROR', err)
	// 	} else {
	// 		console.log('result', JSON.stringify(result))
	// 	}
	// })
	user.get(10, (err, result) => {
		if(err) {
			logger.error('ERROR', err)
		} else {
			logger.debug('user result', result)
		}
		let fei = result
		pets.create(dog, (err, result) => {
			
			if(err) {
				logger.error('ERROR pet', err)
			} else {
				console.log('pet result', JSON.stringify(result))
				let pet = result
				pet.setOwner(fei, (err, result) => {
					if(err) {
						logger.error('ERROR set', err)
					} else {
						logger.debug('set result', result)
					}
				})
			}
		})
	})
	
}).catch(err => {
	logger.debug('----------error--------')
})



