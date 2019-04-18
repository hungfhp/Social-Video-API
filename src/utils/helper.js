import logToFile from 'log-to-file'

export function genderToNumber(gender) {
	if (gender == 'male') return 1
	if (gender == 'female') return 2
	return 0
}

export function log(message = '', fileName = '') {
	// eslint-disable-next-line no-console
	console.log('---------------', fileName, message)
	logToFile(message, fileName)
}
