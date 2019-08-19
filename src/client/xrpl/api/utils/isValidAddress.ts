import crypto from 'crypto'
const BASE58 = 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz'
const baseX = require('base-x')(BASE58)
const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export function isValidAddress(address: string) {
    try {
        return api.isValidAddress(address)
    } catch(error) {
        return offlineValidation(address)
    }
}

/**
 * Validates an address such that it meets these criteria:
 * 1) Between 25 and 35 characters in length
 * 2) Starts with the character 'r'
 * 3) Uses alphanumeric characters (excluding the number "0" capital letter "O", capital letter "I", and lowercase letter "l")
 * 4) Check the 4-byte checksum
 * 
 * documentation can be found here:
 * https://developers.ripple.com/basic-data-types.html#addresses
 * 
 * @param address
 * @returns true if valid
 */
export function offlineValidation(address: string) {
    if(address.length < 25 || address.length > 35){
		return false
	}
	if(!address.startsWith('r')){
		return false
	}
	const regex = /^[a-km-zA-HJ-NP-Z1-9]*$/
	if(!regex.test(address)){
		return false
	}
	return verifyChecksum(address)
}

function verifyChecksum(address: string){
	let bytes = baseX.decode(address)
	let computedChecksum = bytesToHex(sha256(sha256(bytes.slice(0, -4)))).slice(0, 8) //runs sha256 twice on all the bytes except the last 4, and then returns the last 8 characters of the string representation. These 8 chars are equivalent to 4 bytes
	let checksum = bytesToHex(bytes.slice(-4)) //the last 4 bytes are the checksum
	return computedChecksum === checksum
}

function toHex(num: number){
	let hex = Math.round(num).toString(16);
    if(hex.length === 1) {
        hex = '0' + hex;
    }
    return hex;
}

function bytesToHex(bytes: Buffer | number[]){
	 let hex = '';
     for(var i = 0; i < bytes.length; i++) {
         hex += toHex(bytes[i]);
     }
     return hex;
}

function sha256(bytes: crypto.BinaryLike) {
	return crypto.createHash('sha256').update(bytes).digest()
}