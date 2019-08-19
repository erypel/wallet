import { ErrorMap } from './ErrorMap'

const bad_amount = 'temBAD_AMOUNT'
const bad_amount_message = 'An amount specified by the transaction (for example the destination Amount or SendMax values of a Payment) was invalid, possibly because it was a negative number.'

const bad_auth_master = 'temBAD_AUTH_MASTER'
const bad_auth_master_message = 'The key used to sign this transaction does not match the master key for the account sending it, and the account does not have a Regular Key set.'

const bad_currency = 'temBAD_CURRENCY'
const bad_currency_message = 'The transaction improperly specified a currency field. See Specifying Currency Amounts for the correct format.'

const bad_expiration = 'temBAD_EXPIRATION'
const bad_expiration_message = 'The transaction improperly specified an expiration value, for example as part of an OfferCreate transaction. Alternatively, the transaction did not specify a required expiration value, for example as part of an EscrowCreate transaction.'

const bad_fee = 'temBAD_FEE'
const bad_fee_message = 'The transaction improperly specified its Fee value, for example by listing a non-XRP currency or some negative amount of XRP.'

const bad_issuer = 'temBAD_ISSUER'
const bad_issuer_message = 'The transaction improperly specified the issuer field of some currency included in the request.'

const bad_limit = 'temBAD_LIMIT'
const bad_limit_message = '	The TrustSet transaction improperly specified the LimitAmount value of a trustline.'

const bad_offer = 'temBAD_OFFER'
const bad_offer_message = 'The OfferCreate transaction specifies an invalid offer, such as offering to trade XRP for itself, or offering a negative amount.'

const bad_path = 'temBAD_PATH'
const bad_path_message = 'The Payment transaction specifies one or more Paths improperly, for example including an issuer for XRP, or specifying an account differently.'

const bad_path_loop = 'temBAD_PATH_LOOP'
const bad_path_loop_message = 'One of the Paths in the Payment transaction was flagged as a loop, so it cannot be processed in a bounded amount of time.'

const bad_send_xrp_limit = 'temBAD_SEND_XRP_LIMIT'
const bad_send_xrp_limit_message = 'The Payment transaction used the tfLimitQuality flag in a direct XRP-to-XRP payment, even though XRP-to-XRP payments do not involve any conversions.'

const bad_send_xrp_max = 'temBAD_SEND_XRP_MAX'
const bad_send_xrp_max_message = '	The Payment transaction included a SendMax field in a direct XRP-to-XRP payment, even though sending XRP should never require SendMax. (XRP is only valid in SendMax if the destination Amount is not XRP.)'

const bad_send_xrp_no_direct = 'temBAD_SEND_XRP_NO_DIRECT'
const bad_send_xrp_no_direct_message = 'The Payment transaction used the tfNoDirectRipple flag for a direct XRP-to-XRP payment, even though XRP-to-XRP payments are always direct.'

const bad_send_xrp_partial = 'temBAD_SEND_XRP_PARTIAL'
const bad_send_xrp_partial_message = 'The Payment transaction used the tfPartialPayment flag for a direct XRP-to-XRP payment, even though XRP-to-XRP payments should always deliver the full amount.'

const bad_send_xrp_paths = 'temBAD_SEND_XRP_PATHS'
const bad_send_xrp_paths_message = 'The Payment transaction included Paths while sending XRP, even though XRP-to-XRP payments should always be direct.'

const bad_sequence = 'temBAD_SEQUENCE'
const bad_sequence_message = 'The transaction is references a sequence number that is higher than its own Sequence number, for example trying to cancel an offer that would have to be placed after the transaction that cancels it.'

const bad_signature = 'temBAD_SIGNATURE'
const bad_signature_message = 'The signature to authorize this transaction is either missing, or formed in a way that is not a properly-formed signature. (See tecNO_PERMISSION for the case where the signature is properly formed, but not authorized for this account.)'

const bad_src_account = 'temBAD_SRC_ACCOUNT'
const bad_src_account_message = 'The Account on whose behalf this transaction is being sent (the "source account") is not a properly-formed account address.'

const bad_transfer_rate = 'temBAD_TRANSFER_RATE'
const bad_transfer_rate_message = 'The TransferRate field of an AccountSet transaction is not properly formatted or out of the acceptable range.'

const cannot_preauth_self = 'temCANNOT_PREAUTH_SELF'
const cannot_preauth_self_message = 'The sender of the DepositPreauth transaction was also specified as the account to preauthorize. You cannot preauthorize yourself.'

const dst_is_src = 'temDST_IS_SRC'
const dst_is_src_message = 'The transaction improperly specified a destination address as the Account sending the transaction. This includes trust lines (where the destination address is the issuer field of LimitAmount) and payment channels (where the destination address is the Destination field).'

const dst_needed = 'temDST_NEEDED'
const dst_needed_message = 'The transaction improperly omitted a destination. This could be the Destination field of a Payment transaction, or the issuer sub-field of the LimitAmount field fo a TrustSet transaction.'

const invalid = 'temINVALID'
const invalid_message = 'The transaction is otherwise invalid. For example, the transaction ID may not be the right format, the signature may not be formed properly, or something else went wrong in understanding the transaction.'

const invalid_flag = 'temINVALID_FLAG'
const invalid_flag_message = 'The transaction includes a Flag that does not exist, or includes a contradictory combination of flags.'

const malformed = 'temMALFORMED'
const malformed_message = 'Unspecified problem with the format of the transaction.'

const redundant = 'temREDUNDANT'
const redundant_message = 'The transaction would do nothing; for example, it is sending a payment directly to the sending account, or creating an offer to buy and sell the same currency from the same issuer.'

const ripple_empty = 'temRIPPLE_EMPTY'
const ripple_empty_message = 'The Payment transaction includes an empty Paths field, but paths are necessary to complete this payment.'

const bad_weight = 'temBAD_WEIGHT'
const bad_weight_message = 'The SignerListSet transaction includes a SignerWeight that is invalid, for example a zero or negative value.'

const bad_signer = 'temBAD_SIGNER'
const bad_signer_message = 'The SignerListSet transaction includes a signer who is invalid. For example, there may be duplicate entries, or the owner of the SignerList may also be a member.'

const bad_quorum = 'temBAD_QUORUM'
const bad_quorum_message = 'The SignerListSet transaction has an invalid SignerQuorum value. Either the value is not greater than zero, or it is more than the sum of all signers in the list.'

const disabled = 'temDISABLED'
const disabled_message = 'The transaction requires logic that is disabled. Typically this means you are trying to use an amendment that is not enabled for the current ledger.'

export const temCodes: ErrorMap = {
    [bad_amount]: bad_amount_message,
    [bad_auth_master]: bad_auth_master_message,
    [bad_currency]: bad_currency_message,
    [bad_expiration]: bad_expiration_message,
    [bad_fee]: bad_fee_message,
    [bad_issuer]: bad_issuer_message,
    [bad_limit]: bad_limit_message,
    [bad_offer]: bad_offer_message,
    [bad_path]: bad_path_message,
    [bad_path_loop]: bad_path_loop_message,
    [bad_send_xrp_limit]: bad_send_xrp_limit_message,    
    [bad_send_xrp_max]: bad_send_xrp_max_message,
    [bad_send_xrp_no_direct]: bad_send_xrp_no_direct_message,
    [bad_send_xrp_partial]: bad_send_xrp_partial_message,
    [bad_send_xrp_paths]: bad_send_xrp_paths_message,
    [bad_sequence]: bad_sequence_message,
    [bad_signature]: bad_signature_message,
    [bad_src_account]: bad_src_account_message,
    [bad_transfer_rate]: bad_transfer_rate_message,
    [cannot_preauth_self]: cannot_preauth_self_message,
    [dst_is_src]: dst_is_src_message,
    [dst_needed]: dst_needed_message,
    [invalid]: invalid_message,
    [invalid_flag]: invalid_flag_message,
    [malformed]: malformed_message,
    [redundant]: redundant_message,
    [ripple_empty]: ripple_empty_message,
    [bad_weight]: bad_weight_message,
    [bad_signer]: bad_signer_message,
    [bad_quorum]: bad_quorum_message,
    [disabled]: disabled_message
}