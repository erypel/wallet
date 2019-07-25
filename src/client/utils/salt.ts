import crypto from 'crypto'

export default function salt(
	value: string,
	salt: string = randomString()
) {
	const hash = crypto
	.createHmac('sha512', salt)
	.update(value)
	return {
		salt,
		hash: hash.digest('hex')
	}
}

function randomString(){
	return crypto.randomBytes(4).toString('hex')
}