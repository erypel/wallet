import validatePassword from '../utils/validatePassword'
var assert = require('chai').assert

//Your password does not meet the following requirement(s): At least one upper case english letter [A-Z]. At least one lower case english letter [a-z]. At least one digit [0-9]. At lease one special character [#?!@$ %^&*-]. A password length between 10 and 128 characters.

describe('offlineValidation correctly validates addresses', function() {
    it('should validate addresses', function() {
        const validAddress1 = 'R8<~rKXG#s'
        const validAddress2 = 'j%avgM?aTHDZP2mU!He!pPY-#H8y*k-7-hwGj#+CFwKXdXx9Aqy!95UbUrsESg6S?XQLRFnWwF!F!X@Dj!aMZeCMPF?uF&w54m$dAut8apdhDrDG2x^Sd-CKsyN$anF^'
        const validAddress3 = 'e+YYXK3dbpQYx!b^#2CuTnSCTG5drxQ92-QHhw&_?y#jGeUKc2e9@89z'
        const tooShort = '9WB*MH?jD'
        const tooLong = 'AC6sT=7Z&+HPwSkg##HEDxs8-+JFt?tqbwgpr&kdxU!MZBp%cV*-&ADwmgW2V8TSTGqk@MnPM3NAN_btUB!VeCHayS7RW+nxLqjw?5Ecg294wB9^NVDf&Sxj+AyHw!+v6'
        const doesNotContainDigit = 'A$wdQ%E*%+ebrtW^%ZeX'
        const doesNotContainSpecialCharacter = 'kNCNeRg85fVfxZfZ69xR'
        const doesNotContainLowercaseLetter = 'G*N5?9ZH&!#D8TP^L+U&'
        const doesNotContainUppercaseLetter = '!+-h5bc$&g+wc?375ds?'
        const allErrors = ''
        const someErrors = 'Tuuaqm2kx'

        const validatedValidAddress1 = validatePassword(validAddress1)
        const validatedValidAddresss2 = validatePassword(validAddress2)
        const validatedValidAddress3 = validatePassword(validAddress3)
        const validatedTooShort = validatePassword(tooShort)
        const validatedTooLong = validatePassword(tooLong)
        const validatedNoDigit = validatePassword(doesNotContainDigit)
        const validatedNoSpecChar = validatePassword(doesNotContainSpecialCharacter)
        const validatedNoLowercase = validatePassword(doesNotContainLowercaseLetter)
        const validatedNoUppercase = validatePassword(doesNotContainUppercaseLetter)
        const validatedAllErrors = validatePassword(allErrors)
        const validatedSomeErrors = validatePassword(someErrors)
       
        assert.isTrue(validatedValidAddress1.success && (validatedValidAddress1.message === undefined))
        assert.isTrue(validatedValidAddresss2.success && (validatedValidAddresss2.message === undefined))
        assert.isTrue(validatedValidAddress3.success && (validatedValidAddress3.message === undefined))
        assert.isTrue(!validatedTooShort.success && (validatedTooShort.message === "Your password does not meet the following requirement(s): A password length between 10 and 128 characters."))
        assert.isTrue(!validatedTooLong.success && (validatedTooShort.message === "Your password does not meet the following requirement(s): A password length between 10 and 128 characters."))
        assert.isTrue(!validatedNoDigit.success && (validatedNoDigit.message === "Your password does not meet the following requirement(s): At least one digit [0-9]."))
        assert.isTrue(!validatedNoSpecChar.success && (validatedNoSpecChar.message === "Your password does not meet the following requirement(s): At lease one special character [#?!@$ %^&*-]."))
        assert.isTrue(!validatedNoLowercase.success && (validatedNoLowercase.message === "Your password does not meet the following requirement(s): At least one lower case english letter [a-z]."))
        assert.isTrue(!validatedNoUppercase.success && (validatedNoUppercase.message === "Your password does not meet the following requirement(s): At least one upper case english letter [A-Z]."))
        assert.isTrue(!validatedAllErrors.success && (validatedAllErrors.message === "Your password does not meet the following requirement(s): At least one upper case english letter [A-Z]. At least one lower case english letter [a-z]. At least one digit [0-9]. At lease one special character [#?!@$ %^&*-]. A password length between 10 and 128 characters."))
        assert.isTrue(!validatedSomeErrors.success && (validatedSomeErrors.message === "Your password does not meet the following requirement(s): At lease one special character [#?!@$ %^&*-]. A password length between 10 and 128 characters."))
    });
});