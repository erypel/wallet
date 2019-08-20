import { ErrorMap } from './ErrorMap'

const insuf_fee_b = 'terINSUF_FEE_B'
const insuf_fee_b_message = 'The account sending the transaction does not have enough XRP to pay the Fee specified in the transaction.'

const no_account = 'terNO_ACCOUNT'
const no_account_message = 'The address sending the transaction is not funded in the ledger (yet).'

const no_auth = 'terNO_AUTH'
const no_auth_message = 'The transaction would involve adding currency issued by an account with lsfRequireAuth enabled to a trust line that is not authorized. For example, you placed an offer to buy a currency you aren\'t authorized to hold.'

const owners = 'terOWNERS'
const owners_message = 'The transaction requires that account sending it has a nonzero "owners count", so the transaction cannot succeed. For example, an account cannot enable the lsfRequireAuth flag if it has any trust lines or available offers.'

const pre_seq = 'terPRE_SEQ'
const pre_seq_message = 'The Sequence number of the current transaction is higher than the current sequence number of the account sending the transaction.'

const retry = 'terRETRY'
const retry_message = 'Unspecified retriable error.'

const queued = 'terQUEUED'
const queued_message = 'The transaction met the load-scaled transaction cost but did not meet the open ledger requirement, so the transaction has been queued for a future ledger.'

export const terCodes: ErrorMap = {
    [insuf_fee_b]: insuf_fee_b_message,
    [no_account]: no_account_message,
    [no_auth]: no_auth_message,
    [owners]: owners_message,
    [pre_seq]: pre_seq_message,
    [retry]: retry_message,
    [queued]: queued_message
}