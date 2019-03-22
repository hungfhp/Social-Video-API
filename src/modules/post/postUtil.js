export function debug(obj) {
	console.log(obj)
}

export function isOwn(post, req, res) {
	if (!post.user.equals(req.user._id)) {
		return res.sendStatus(HTTPStatus.UNAUTHORIZED)
	}
}
