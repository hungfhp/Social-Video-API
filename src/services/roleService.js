import AccessControl from 'accesscontrol'
var ac = new AccessControl()

ac.grant('viewer')
	.readAny('user')
	.readAny('follow')
	.readAny('movie')
	.readAny('post')
	.readAny('group')

ac.grant('user')
	.create('user')
	.updateOwn('user')
	.deleteOwn('user')
	.readAny('user')
	.create('follow')
	.updateOwn('follow')
	.deleteOwn('follow')
	.readAny('follow')
	.create('movie')
	.updateOwn('movie')
	.deleteOwn('movie')
	.readAny('movie')
	.create('post')
	.updateOwn('post')
	.deleteOwn('post')
	.readAny('post')
	.create('group')
	.updateOwn('group')
	.deleteOwn('group')
	.readAny('group')

ac.grant('editer').extend('user')

ac.grant('admin')
	.extend('user')
	.updateAny('movie')
	.deleteAny('movie')

ac.grant('superadmin').extend('admin')

export default ac
