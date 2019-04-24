/* eslint-disable no-console */
import request from 'request'
import cons from '../config/constants'
import fs from 'fs'

export async function uploadFile(
	path = 'default',
	overwrite = 'false',
	fileUrl,
	callback
) {
	request.post(
		{
			url: cons.UPLOAD_VBEE_URL,
			headers: {
				authorization: cons.UPLOAD_VBEE_TOKEN
			},
			formData: {
				path: path,
				overwrite: overwrite,
				file: request(fileUrl).on('error', function(err) {
					console.error(err)
				})
			}
		},
		(error, res, body) => {
			if (error) {
				throw error
			}
			callback(JSON.parse(body))
		}
	)
}
