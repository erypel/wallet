import { TransactionBuilder } from '../TransactionBuilder'
import Transaction from '../Transaction'
import { IssuerAmount } from '../../Amount'
import TrustSetBuilder from './TrustSetBuilder'

/**
 * Authorize the other party to hold issuances from this account. (No effect 
 * unless using the asfRequireAuth AccountSet flag.) Cannot be unset.
 */
const tf_SETF_AUTH = 65536

/**
 * Blocks rippling between two trustlines of the same currency, if this flag is
 * set on both. (See No Ripple for details.) If the fix1578 amendment is enabled,
 * a transaction that uses this flag and cannot enable NoRipple fails with the 
 * result code tecNO_PERMISSION. If the amendment is not enabled, the transaction
 * can result in tesSUCCESS (making any other changes it can) even if it cannot 
 * enable NoRipple on the trust line.
 */
const tf_SET_NO_RIPPLE = 131072

/**
 * Clears the No-Rippling flag. (See NoRipple for details.)
 */
const tf_CLEAR_NO_RIPPLE = 262144

/**
 * 	Freeze the trustline.
 */
const tf_SET_FREEZE = 1048576

/**
 * 	Unfreeze the trustline.
 */
const tf_CLEAR_FREEZE = 2097152

export const TrustSetFlags = {
    tf_SETF_AUTH,
    tf_SET_NO_RIPPLE,
    tf_CLEAR_NO_RIPPLE,
    tf_SET_FREEZE,
    tf_CLEAR_FREEZE
}

export default class TrustSet extends Transaction {
    LimitAmount: IssuerAmount
    QualityIn?: number
    QualityOut?: number

    constructor(txBuilder: TransactionBuilder, builder: TrustSetBuilder) {
        super(txBuilder)
        this.LimitAmount = builder.limitAmount
        this.QualityIn = builder.qualityIn
        this.QualityOut = builder.qualityOut
    }
}