//Web Environment 
const isProdEnv:boolean = process.env.NODE_ENV === 'production'

//Development Env Config
//listen port
let listenPort:Number = 3000

//Redis Config 
let redis = {
	port: 6379,
	host: '192.168.1.100',
	db: 8
}

//Mysql Config
let mysql = {
	host: '192.168.1.100',
	database: 'nodeweb',
	user: 'root',
	password: 'mysql123',
	protocol: 'mysql',
	port: '3306'
}

//Production Env Config
if(isProdEnv) {
	//listen port
	listenPort = 3000
	//redis config
	redis = {
		port: 6379,
		host: '192.168.1.100',
		db: 9
	}
	//mysql config
	mysql = {
		host: '192.168.1.100',
		database: 'nodeweb',
		user: 'root',
		password: 'mysql123',
		protocol: 'mysql',
		port: '3306'
	}
}


export default {
	listenPort: listenPort,
	redis: redis,
	mysql: mysql
}
