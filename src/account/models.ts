import * as orm from 'orm'

export const User = (db):void => {
	 const user = db.define('user', {
		id: {type: 'serial', key: true},
		password: {type: 'text', size: 128, required: true},
		type: {type: 'integer', size: 0|1|2, defaultValue: 0},
		nick: {type: 'text', required: true},
		mobile: {type: 'text', required: true},
		last_login: {type: 'date', time: true},
		create_time: {type: 'date', time: true, required: true},
		update_time: {type: 'date', time: true, required: true}
	}, {
		validations: {
			nick: [
				orm.enforce.unique('nick has been used'),
				orm.enforce.ranges.length(5, undefined, 'nick must be at least 5 letters long'),
				orm.enforce.ranges.length(undefined, 30, 'nick can not be longer than 30 letters')
			],
			mobile: [
				orm.enforce.unique('this mobile has be registed'),
				orm.enforce.ranges.length(11, 11, 'mobile number length must be 11')
			]
		},
		hooks: {
			beforeValidation(next) {
				this.create_time = new Date().toISOString().slice(0, 19)
				return next()
			}
		},
		methods: {
			baseInfo() {
				return {
					nick: this.nick,
					mobile: this.mobile,
					type: this.type
				}
			}
		}
	})
}



