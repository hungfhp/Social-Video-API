import request from 'request'
import cons from '../config/constants'
import fs from 'fs'

export async function uploadFile(path = 'default', overwrite = false, fileUrl) {
	await request.post(
		{
			url: 'https://upload.vbee.vn/api/v1/upload/file',
			headers: {
				'content-type': '*/*',
				authorization: cons.UPLOAD_VBEE_TOKEN
			},
			formData: {
				path: path,
				overwrite: overwrite,
				file: request(fileUrl)
			}
		},
		(error, res, body) => {
			if (error) {
				throw error
			}
			// console.log(JSON.parse(body))
			return JSON.parse(body)
		}
	)
}
