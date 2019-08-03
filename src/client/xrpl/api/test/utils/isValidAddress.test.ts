import  { offlineValidation, isValidAddress } from '../../utils/isValidAddress'
var assert = require('chai').assert


describe('offlineValidation correctly validates addresses', function() {
    it('should validate addresses', function() {
        const validAddress1 = 'rBpMw6fUSV6TnxeAK1wEhuj854ZiTasjtS'
        const validAddress2 = 'rwYQjHp9HZiKKpZB4i4fvc8eQvAtA7vdY6'
        const validAddress3 = 'rDTXLQ7ZKZVKz33zJbHjgVShjsBnqMBhmN'
        const tooShort = 'rBpMw6fUSV6TnxeAK1wEhuj8'
        const tooLong = 'rBpMw6fUSV6TnxeAK1wEhuj854ZiTasjtSp'
        const doesNotStartWithR = 'BpMw6fUSV6TnxeAK1wEhuj854ZiTasjtS'
        const invaliddAlphaNumeric0 = 'r0pMw6fUSV6TnxeAK1wEhuj854ZiTasjtS'
        const invalidAlphaNumericO = 'rOpMw6fUSV6TnxeAK1wEhuj854ZiTasjtS'
        const invalidAlphaNumericI = 'rBpMw6fUSV6TnxeAKIwEhuj854ZiTasjtS'
        const invalidAlphaNumericl = 'rBpMw6fUSV6TnxeAKlwEhuj854ZiTasjtS'
        const invalidChecksum = 'rBpMw6fUSV6TnxeAK1wEhuj854ZiTasjt6'
        assert.isTrue(offlineValidation(validAddress1))
        assert.isTrue(offlineValidation(validAddress2))
        assert.isTrue(offlineValidation(validAddress3))
        assert.isFalse(offlineValidation(tooShort))
        assert.isFalse(offlineValidation(tooLong))
        assert.isFalse(offlineValidation(doesNotStartWithR))
        assert.isFalse(offlineValidation(invaliddAlphaNumeric0))
        assert.isFalse(offlineValidation(invalidAlphaNumericO))
        assert.isFalse(offlineValidation(invalidAlphaNumericI))
        assert.isFalse(offlineValidation(invalidAlphaNumericl))
        assert.isFalse(offlineValidation(invalidChecksum))
    });
});

describe('isValidAddress from rippled works as expected', function() {
    it('should validate addresses', function() {
        const validAddress1 = 'rBpMw6fUSV6TnxeAK1wEhuj854ZiTasjtS'
        const validAddress2 = 'rwYQjHp9HZiKKpZB4i4fvc8eQvAtA7vdY6'
        const validAddress3 = 'rDTXLQ7ZKZVKz33zJbHjgVShjsBnqMBhmN'
        const tooShort = 'rBpMw6fUSV6TnxeAK1wEhuj8'
        const tooLong = 'rBpMw6fUSV6TnxeAK1wEhuj854ZiTasjtSp'
        const doesNotStartWithR = 'BpMw6fUSV6TnxeAK1wEhuj854ZiTasjtS'
        const invaliddAlphaNumeric0 = 'r0pMw6fUSV6TnxeAK1wEhuj854ZiTasjtS'
        const invalidAlphaNumericO = 'rOpMw6fUSV6TnxeAK1wEhuj854ZiTasjtS'
        const invalidAlphaNumericI = 'rBpMw6fUSV6TnxeAKIwEhuj854ZiTasjtS'
        const invalidAlphaNumericl = 'rBpMw6fUSV6TnxeAKlwEhuj854ZiTasjtS'
        const invalidChecksum = 'rBpMw6fUSV6TnxeAK1wEhuj854ZiTasjt6'
        assert.isTrue(isValidAddress(validAddress1))
        assert.isTrue(isValidAddress(validAddress2))
        assert.isTrue(isValidAddress(validAddress3))
        assert.isFalse(isValidAddress(tooShort))
        assert.isFalse(isValidAddress(tooLong))
        assert.isFalse(isValidAddress(doesNotStartWithR))
        assert.isFalse(isValidAddress(invaliddAlphaNumeric0))
        assert.isFalse(isValidAddress(invalidAlphaNumericO))
        assert.isFalse(isValidAddress(invalidAlphaNumericI))
        assert.isFalse(isValidAddress(invalidAlphaNumericl))
        assert.isFalse(isValidAddress(invalidChecksum))
    });
});