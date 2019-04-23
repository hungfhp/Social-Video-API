/* eslint-disable */
import AccessControl from 'role-acl'
var ac = new AccessControl()

ac.grant('viewer')
	.execute('readAny').on('user', ['*', '!password'])
	.execute('readAny').on('followMovie')
	.execute('readAny').on('followUser')
	.execute('readAny').on('relationship')
	.execute('readAny').on('movie')
	.execute('readAny').on('post')
	.execute('readAny').on('group')
	.execute('readAny').on('like')
	.execute('readAny').on('member')

ac.grant('user').extend('viewer')
	.execute('readOwn').on('user')
	.execute('createOwn').on('user')
	.execute('updateOwn').on('user')
	.execute('deleteOwn').on('user')

	.execute('readOwn').on('followMovie')
	.execute('createOwn').on('followMovie')
	.execute('updateOwn').on('followMovie')
	.execute('deleteOwn').on('followMovie')

	.execute('readOwn').on('followUser')
	.execute('createOwn').on('followUser')
	.execute('updateOwn').on('followUser')
	.execute('deleteOwn').on('followUser')

	.execute('readOwn').on('relationship')
	.execute('createOwn').on('relationship')
	.execute('updateOwn').on('relationship')
	.execute('deleteOwn').on('relationship')

	.execute('readOwn').on('movie')
	.execute('createOwn').on('movie')
	.execute('updateOwn').on('movie')
	.execute('deleteOwn').on('movie')

	.execute('readOwn').on('post')
	.execute('createOwn').on('post')
	.execute('updateOwn').on('post')
	.execute('deleteOwn').on('post')

	.execute('readOwn').on('group')
	.execute('createOwn').on('group')
	.execute('updateOwn').on('group')
	.execute('deleteOwn').on('group')

	.execute('readOwn').on('like')
	.execute('createOwn').on('like')
	.execute('updateOwn').on('like')
	.execute('deleteOwn').on('like')

	.execute('readOwn').on('member')
	.execute('createOwn').on('member', ['*', '!status'])
	.execute('updateOwn').on('member')
	.execute('deleteOwn').on('member')

ac.grant('editer').extend('user')

ac.grant('admin').extend('user')
	.execute('readAny').on('movie')
	.execute('createAny').on('movie')
	.execute('updateAny').on('movie')
	.execute('deleteAny').on('movie')

ac.grant('superadmin').extend('admin')
	.execute('readAny').on('user')
	.execute('createAny').on('user')
	.execute('updateAny').on('user')
	.execute('deleteAny').on('user')

	.execute('readAny').on('followMovie')
	.execute('createAny').on('followMovie')
	.execute('updateAny').on('followMovie')
	.execute('deleteAny').on('followMovie')

	.execute('readAny').on('followUser')
	.execute('createAny').on('followUser')
	.execute('updateAny').on('followUser')
	.execute('deleteAny').on('followUser')

	.execute('readAny').on('movie')
	.execute('createAny').on('movie')
	.execute('updateAny').on('movie')
	.execute('deleteAny').on('movie')

	.execute('readAny').on('post')
	.execute('createAny').on('post')
	.execute('updateAny').on('post')
	.execute('deleteAny').on('post')

	.execute('readAny').on('group')
	.execute('createAny').on('group')
	.execute('updateAny').on('group')
	.execute('deleteAny').on('group')

export default ac
