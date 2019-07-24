export default function validatePassword(password: string){
	/*
	 * OWASP defines a strong password as:
	 * 
	 * 1) Password Length Minimum length should be enforced by the application
	 * Passwords shorter than 10 characters are considered weak Typical maximum
	 * password length is 128 characters Passphrases shorter than 20 characters
	 * are usually considered weak if they only consist of lower case latin
	 * characters 2) Password Complexity The application should enforce password
	 * complexity rules to discourage easy passwords Password mechanisms should
	 * allow virtually any character the user can type including spaces
	 * Passwords should be case sensitive An example of basic complexity
	 * checking would be: password must contain 3/4 of the following rules: at
	 * least 1 uppercase character (A-Z) at least 1 lowercase character (a-z) at
	 * least 1 digit (0-9) at least 1 special character at least 10 characters
	 * at most 128 characters not more than 2 identicaly characters in a row
	 * (e.g., 111 not allowed)
	 */
	
	/*
	 * This regex enforces these rules: 1) At least one uppercase english letter
	 * [A-Z] 2) At least one lowercase english letter [a-z] 3) At least one
	 * digit [0-9] 4) At least one special character [#?!@$% ^&*-] 5) Minimum
	 * length 10, maximum length 128
	 */
	const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,128}$/
	const result = regex.test(password)
	if(!result){
		// build error message
		var message = "Your password does not meet the following requirement(s):"
		const upperCaseRegex = /^.*[A-Z].*$/
		const lowerCaseRegex = /^.*[a-z].*$/ 
		const digitRegex = /^.*[0-9].*$/ 
		const specialCharRegex = /^.*[#?!@$% ^&*-].*$/ 
	    if(!upperCaseRegex.test(password)){
	    	message += ' At least one upper case english letter [A-Z].'
	    }
		if(!lowerCaseRegex.test(password)){
			message += ' At least one lower case english letter [a-z].'
		}
		if(!digitRegex.test(password)){
			message += ' At least one digit [0-9].'
		}
		if(!specialCharRegex.test(password)){
			message += ' At lease one special character [#?!@$ %^&*-].'
		}
		if(password.length < 10 || password.length > 128){
			message += ' A password length between 10 and 128 characters.'
		}
		return {success: false, message: message}
	}
	else{
		return {success: true}
	}
}