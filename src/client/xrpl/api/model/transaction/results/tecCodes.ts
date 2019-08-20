import { ErrorMap } from './ErrorMap'

const claim = 'tecCLAIM'
const claim_message = 'Unspecified failure, with transaction cost destroyed.'

const cryptocondition_error = 'tecCRYPTOCONDITION_ERROR'
const cryptocondition_error_message = 'This EscrowCreate or EscrowFinish transaction contained a malformed or mismatched crypto-condition.'

const dir_full = 'tecDIR_FULL'
const dir_full_message = 'The transaction tried to add an object (such as a trust line, Check, Escrow, or Payment Channel) to an account\'s owner directory, but that account cannot own any more objects in the ledger.'

const duplicate = 'tecDUPLICATE'
const duplicate_message = 'The transaction tried to create an object (such as a DepositPreauth authorization) that already exists.'

const dst_tag_needed = 'tecDST_TAG_NEEDED'
const dst_tag_needed_message = 'The Payment transaction omitted a destination tag, but the destination account has the lsfRequireDestTag flag enabled.'

const expired = 'tecEXPIRED'
const expired_message = 'The transaction tried to create an object (such as an Offer or a Check) whose provided Expiration time has already passed.'

const failed_processing = 'tecFAILED_PROCESSING'
const failed_processing_message = 'An unspecified error occurred when processing the transaction.'

const frozen = 'tecFROZEN'
const frozen_message = 'he OfferCreate transaction failed because one or both of the assets involved are subject to a global freeze.'

const insuf_reserve_line = 'tecINSUF_RESERVE_LINE'
const insuf_reserve_line_message = 'The transaction failed because the sending account does not have enough XRP to create a new trust line. (See: Reserves) This error occurs when the counterparty already has a trust line in a non-default state to the sending account for the same currency. (See tecNO_LINE_INSUF_RESERVE for the other case.)'

const insuf_reserve_offer = 'tecINSUF_RESERVE_OFFER'
const insuf_reserve_offer_message = 'The transaction failed because the sending account does not have enough XRP to create a new Offer. (See: Reserves)'

const insufficient_reserve = 'tecINSUFFICIENT_RESERVE'
const insufficient_reserve_message = 'The transaction would increase the reserve requirement higher than the sending account\'s balance. SignerListSet, PaymentChannelCreate, PaymentChannelFund, and EscrowCreate can return this error code. See SignerLists and Reserves for more information.'

const internal = 'tecINTERNAL'
const internal_message = 'Unspecified internal error, with transaction cost applied. This error code should not normally be returned. If you can reproduce this error, please report an issue'

const invariant_failed = 'tecINVARIANT_FAILED'
const invariant_failed_message = 'An invariant check failed when trying to execute this transaction. Requires the EnforceInvariants amendment. If you can reproduce this error, please report an issue '

const need_master_key = 'tecNEED_MASTER_KEY'
const need_master_key_message = 'This transaction tried to cause changes that require the master key, such as disabling the master key or giving up the ability to freeze balances. '

const no_alternative_key = 'tecNO_ALTERNATIVE_KEY'
const no_alternative_key_message = 'The transaction tried to remove the only available method of authorizing transactions. This could be a SetRegularKey transaction to remove the regular key, a SignerListSet transaction to delete a SignerList, or an AccountSet transaction to disable the master key. (Prior to rippled 0.30.0, this was called tecMASTER_DISABLED.)'

const no_auth = 'tecNO_AUTH'
const no_auth_message = 'The transaction failed because it needs to add a balance on a trust line to an account with the lsfRequireAuth flag enabled, and that trust line has not been authorized. If the trust line does not exist at all, tecNO_LINE occurs instead.'

const no_dst = 'tecNO_DST'
const no_dst_message = 'The account on the receiving end of the transaction does not exist. This includes Payment and TrustSet transaction types. (It could be created if it received enough XRP.)'

const no_dst_insuf_xrp = 'tecNO_DST_INSUF_XRP'
const no_dst_insuf_xrp_message = 'The account on the receiving end of the transaction does not exist, and the transaction is not sending enough XRP to create it.'

const no_entry = 'tecNO_ENTRY'
const no_entry_message = 'Reserved for future use.'

const no_issuer = 'tecNO_ISSUER'
const no_issuer_message = 'The account specified in the issuer field of a currency amount does not exist.'

const killed = 'tecKILLED'
const killed_message = 'The OfferCreate transaction specified the tfFillOrKill flag and could not be filled, so it was killed. (Requires the fix1578 amendment.)'

const no_line = 'tecNO_LINE'
const no_line_message = 'The TakerPays field of the OfferCreate transaction specifies an asset whose issuer has lsfRequireAuth enabled, and the account making the offer does not have a trust line for that asset. (Normally, making an offer implicitly creates a trust line if necessary, but in this case it does not bother because you cannot hold the asset without authorization.) If the trust line exists, but is not authorized, tecNO_AUTH occurs instead.'

const no_line_insuf_reserve = 'tecNO_LINE_INSUF_RESERVE'
const no_line_insuf_reserve_message = 'The transaction failed because the sending account does not have enough XRP to create a new trust line. (See: Reserves) This error occurs when the counterparty does not have a trust line to this account for the same currency. (See tecINSUF_RESERVE_LINE for the other case.)'

const no_line_redundant = 'tecNO_LINE_REDUNDANT'
const no_line_redundant_message = 'The transaction failed because it tried to set a trust line to its default state, but the trust line did not exist.'

const no_permission = 'tecNO_PERMISSION'
const no_permission_message = 'The sender does not have permission to do this operation. For example, the EscrowFinish transaction tried to release a held payment before its FinishAfter time, someone tried to use PaymentChannelFund on a channel the sender does not own, or a Payment tried to deliver funds to an account with the "DepositAuth" flag enabled.'

const no_regular_key = 'tecNO_REGULAR_KEY'
const no_regular_key_message = 'The AccountSet transaction tried to disable the master key, but the account does not have another way to authorize transactions. If multi-signing is enabled, this code is deprecated and tecNO_ALTERNATIVE_KEY is used instead.'

const no_target = 'tecNO_TARGET'
const no_target_message = 'The transaction referenced an Escrow or PayChannel ledger object that doesn\'t exist, either because it never existed or it has already been deleted. (For example, another EscrowFinish transaction has already executed the held payment.) Alternatively, the destination account has asfDisallowXRP set so it cannot be the destination of this PaymentChannelCreate or EscrowCreate transaction.'

const oversize = 'tecOVERSIZE'
const oversize_message = 'This transaction could not be processed, because the server created an excessively large amount of metadata when it tried to apply the transaction. '

const owners = 'tecOWNERS'
const owners_message = 'The transaction requires that account sending it has a nonzero "owners count", so the transaction cannot succeed. For example, an account cannot enable the lsfRequireAuth flag if it has any trust lines or available offers.'

const path_dry = 'tecPATH_DRY'
const path_dry_message = 'The transaction failed because the provided paths did not have enough liquidity to send anything at all. This could mean that the source and destination accounts are not linked by trust lines.'

const path_partial = 'tecPATH_PARTIAL'
const path_partial_message = '	The transaction failed because the provided paths did not have enough liquidity to send the full amount.'

const unfunded = 'tecUNFUNDED'
const unfunded_message = 'The transaction failed because the account does not hold enough XRP to pay the amount in the transaction and satisfy the additional reserve necessary to execute this transaction. (See: Reserves)'

const unfunded_payment = 'tecUNFUNDED_PAYMENT'
const unfunded_payment_message = 'The transaction failed because the sending account is trying to send more XRP than it holds, not counting the reserve. (See: Reserves)'

const unfunded_offer = 'tecUNFUNDED_OFFER'
const unfunded_offer_message = 'The OfferCreate transaction failed because the account creating the offer does not have any of the TakerGets currency.'

export const tecCodes: ErrorMap = {
    [claim]: claim_message,
    [cryptocondition_error]: cryptocondition_error_message,
    [dir_full]: dir_full_message,
    [duplicate]: duplicate_message,
    [dst_tag_needed]: dst_tag_needed_message,
    [expired]: expired_message,
    [failed_processing]: failed_processing_message,
    [frozen]: frozen_message,
    [insuf_reserve_line]: insuf_reserve_line_message,
    [insuf_reserve_offer]: insuf_reserve_offer_message,
    [insufficient_reserve]: insufficient_reserve_message,
    [internal]: internal_message,
    [invariant_failed]: invariant_failed_message,
    [need_master_key]: need_master_key_message,
    [no_alternative_key]: no_alternative_key_message,
    [no_auth]: no_auth_message,
    [no_dst]: no_dst_message,
    [no_dst_insuf_xrp]: no_dst_insuf_xrp_message,
    [no_entry]: no_entry_message,
    [no_issuer]: no_issuer_message,
    [killed]: killed_message,
    [no_line]: no_line_message,
    [no_line_insuf_reserve]: no_line_insuf_reserve_message,
    [no_line_redundant]: no_line_redundant_message,
    [no_permission]: no_permission_message,
    [no_regular_key]: no_regular_key_message,
    [no_target]: no_target_message,
    [oversize]: oversize_message,
    [owners]: owners_message,
    [path_dry]: path_dry_message,
    [path_partial]: path_partial_message,
    [unfunded]: unfunded_message,
    [unfunded_payment]: unfunded_payment_message,
    [unfunded_offer]: unfunded_offer_message
}