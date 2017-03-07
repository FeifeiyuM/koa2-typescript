
export const Pets = (db):void => {
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
	pets.hasOne('owner', db.models.user, { reverse: 'pets'})
}