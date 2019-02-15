const NODE_ENV = process.env.NODE_ENV
let ROOT_PATH
switch (NODE_ENV) {
case 'development':
	ROOT_PATH = 'http://dpmanagement.17dianjia.net/api/'
	break
case 'production':
	ROOT_PATH = 'http://dpmanagement.dianjia001.com/api/'
	break
default:
	ROOT_PATH = 'http://dpmanagement.17dianjia.net/api/'
	break
}
export default {
	ROOT_PATH
}
