import crypto from 'crypto'

export default function salt(
	password: string,
	salt: string = randomString()
) {
	const hash = crypto
	.createHmac('sha512', salt)
	.update(password)
	return {
		salt,
		hash: hash.digest('hex')
	}
}

function randomString(){
	return crypto.randomBytes(4).toString('hex')
}