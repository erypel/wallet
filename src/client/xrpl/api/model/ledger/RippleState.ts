import Amount from '../Amount'

export default interface RippleState {
    LedgerEntryType: string
    Flags: number
    Balance: Amount
    LowLimit: Amount
    HighLimit: Amount
    PreviousTxnID: string
    PreviousTxnLgrSeq: number
    LowNode?: string
    HighNode?: string
    LowQualityIn?: number
    LowQualityOut?: number
    HighQualityIn?: number
    HighQualityOut?: number
}

/**
 * This RippleState object contributes to the low account's owner reserve.
 * 
 * Corresponds to TrustSet Flag: (None)
 */
const lsf_LOW_RESERVE = 65536

/**
 * This RippleState object contributes to the high account's owner reserve.
 * 
 * Corresponds to TrustSet Flag: (None)
 */
const lsf_HIGH_RESERVE = 131072

/**
 * The low account has authorized the high account to hold the low account's
 * issuances.
 * 
 * Corresponds to TrustSet Flag: tfSetNoRipple
 */
const lsf_LOW_AUTH = 262144

/**
 * The high account has authorized the low account to hold the high account's 
 * issuances.
 * 
 * Corresponds to TrustSet Flag: tfSetNoRipple
 */
const lsf_HIGH_AUTH = 524288

/**
 * The low account has disabled rippling from this trust line to other trust 
 * lines with the same account's NoRipple flag set.
 * 
 * Corresponds to TrustSet Flag: tfSetNoRipple
 */
const lsf_LOW_NO_RIPPLE = 1048576

/**
 * The high account has disabled rippling from this trust line to other trust
 * lines with the same account's NoRipple flag set.
 * 
 * Corresponds to TrustSet Flag: tfSetNoRipple
 */
const lsf_HIGH_NO_RIPPLE = 2097152

/**
 * The low account has frozen the trust line, preventing the high account from 
 * transferring the asset.
 * 
 * Corresponds to TrustSet Flag: tfSetFreeze
 */
const lsf_LOW_FREEZE = 4194304

/**
 * The high account has frozen the trust line, preventing the low account from 
 * transferring the asset.
 * 
 * Corresponds to TrustSet Flag: tfSetFreeze
 */
const lsf_HIGH_FREEZE = 8388608

export const RippleStateFlags = {
    lsf_LOW_RESERVE,
    lsf_HIGH_RESERVE,
    lsf_LOW_AUTH,
    lsf_HIGH_AUTH,
    lsf_LOW_NO_RIPPLE,
    lsf_HIGH_NO_RIPPLE,
    lsf_LOW_FREEZE,
    lsf_HIGH_FREEZE
}