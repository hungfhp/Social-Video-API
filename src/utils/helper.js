import logToFile from 'log-to-file'
import fs from 'fs'

export function genderToNumber(gender) {
	if (gender == 'male') return 1
	if (gender == 'female') return 2
	return 0
}

export function log(message = '', fileName = '') {
	// eslint-disable-next-line no-console
	console.log(
		`---------------log---------------:\n fileName: ${fileName} \n: message ${message}`
	)
	let pathFile = `./logs/${fileName || 'default.log'}`

	fs.exists(pathFile, function(exists) {
		if (exists) {
			logToFile(message, pathFile)
		} else {
			fs.writeFile(pathFile, '', function() {
				logToFile(message, pathFile)
			})
		}
	})

	// eslint-disable-next-line no-console
	console.log('\n')
}
