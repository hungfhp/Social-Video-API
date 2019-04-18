import axios from 'axios'
// import HTTPStatus from 'http-status'

export function requestSynthesis(movieId, subUrl) {}

export function requestResynthesis(movieId, subUrl) {}

export async function checkSynthesis(requestId) {
	return await axios
		.get('http://api.thuyetminhphim.vn/check?request_id=' + requestId)
		.then(function(response) {
			return response.data
		})
		.catch(function(e) {
			// eslint-disable-next-line no-console
			console.log('error', e)
			throw e
		})
}

export function doneSynthesis(movieId, subUrl) {}
