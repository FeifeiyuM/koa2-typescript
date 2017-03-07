import * as Log4js from 'koa-log4'
const logger = Log4js.getLogger('test')

import DbConn from '../utils/orm'
let User:any = null

DbConn(null).then(db => {
	logger.info('db connected sucessfully')

	User = db.define('user', {
		id: {type: 'serial', key: true},
		password: {type: 'text', size: 128, required: true},
		type: {type: 'integer', size: 0|1, defaultValue: 0},
		nick: {type: 'text', size: 30, required: true},
		mobile: {type: 'text', size: 20, required: true},
		lastLogin: {type: 'date', time: true},
		createTime: {type: 'date', time: true, required: true},
		updateTime: {type: 'date', time: true, required: true}
	})

	// User.get(4, (err, result) => {
	// 	if(err) throw err
	// 	console.log('result nick', result.nick)
	// })
	
	// User.find({nick: 'admin'}, (err, result) => {
	// 	if(err) throw err
	// 	console.log('results found: %d', result.length)
	// 	console.log('First person %s, mobile %s', result[0].nick, result[0].mobile)
	// })
	let userInfo = {
		nick: 'normal',
		password: '123456',
		mobile: '1322345345',
		type: 1,
		createTime: '2017-03-03T08:54:50',
		updateTime: '2017-03-03T08:54:50'
	}
	User.create(userInfo, (err, result) => {
		if(err) {
			console.log('err', err)
		} else {
			console.log('create result', result)
		}
	})
})

// import Account from './api'

// let account = new Account()

// setTimeout(function() {
// 	account.getById(4).then(resp => {
// 		logger.info('result', JSON.stringify(resp))
// 	}).catch(err => {
// 		logger.error('error', err)
// 	})
// 	account.login('13512345678', '123456').then(resp => {
// 		logger.info('result', JSON.stringify(resp))
// 	}).catch(err => {
// 		logger.error('error', err)
// 	})
// }, 3000);


