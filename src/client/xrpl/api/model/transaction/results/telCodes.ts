import { ErrorMap } from './ErrorMap'

const bad_domain = 'telBAD_DOMAIN'
const bad_domain_message = 'The transaction specified a domain value (for example, the Domain field of an AccountSet transaction) that cannot be used, probably because it is too long to store in the ledger.'

const bad_path_count = 'telBAD_PATH_COUNT'
const bad_path_count_message = 'The transaction contains too many paths for the local server to process.'

const bad_public_key = 'telBAD_PUBLIC_KEY'
const bad_public_key_message = 'The transaction specified a public key value (for example, as the MessageKey field of an AccountSet transaction) that cannot be used, probably because it is too long.'

const can_not_queue = 'telCAN_NOT_QUEUE'
const can_not_queue_message = 'The transaction did not meet the open ledger cost, but this server did not queue this transaction because it did not meet the queuing restrictions. For example, a transaction returns this code when the sender already has 10 other transactions in the queue. You can try again later or sign and submit a replacement transaction with a higher transaction cost in the Fee field.'

const can_not_queue_balance = 'telCAN_NOT_QUEUE_BALANCE'
const can_not_queue_balance_message = 'The transaction did not meet the open ledger cost and also was not added to the transaction queue because the sum of potential XRP costs of already-queued transactions is greater than the expected balance of the account. You can try again later, or try submitting to a different server.'

const can_not_queue_blocks = 'telCAN_NOT_QUEUE_BLOCKS'
const can_not_queue_blocks_message = 'The transaction did not meet the open ledger cost and also was not added to the transaction queue. This transaction could not replace an existing transaction in the queue because it would block already-queued transactions from the same sender by changing authorization methods. (This includes all SetRegularKey and SignerListSet transactions, as well as AccountSet transactions that change the RequireAuth/OptionalAuth, DisableMaster, or AccountTxnID flags.) You can try again later, or try submitting to a different server.'

const can_not_queue_blocked = 'telCAN_NOT_QUEUE_BLOCKED'
const can_not_queue_blocked_message = 'The transaction did not meet the open ledger cost and also was not added to the transaction queue because a transaction queued ahead of it from the same sender blocks it. (This includes all SetRegularKey and SignerListSet transactions, as well as AccountSet transactions that change the RequireAuth/OptionalAuth, DisableMaster, or AccountTxnID flags.) You can try again later, or try submitting to a different server.'

const can_not_queue_fee = 'telCAN_NOT_QUEUE_FEE'
const can_not_queue_fee_message = 'The transaction did not meet the open ledger cost and also was not added to the transaction queue. This code occurs when a transaction with the same sender and sequence number already exists in the queue and the new one does not pay a large enough transaction cost to replace the existing transaction. To replace a transaction in the queue, the new transaction must have a Fee value that is at least 25% more, as measured in fee levels. You can increase the Fee and try again, send this with a higher Sequence number so it doesn\'t replace an existing transaction, or try sending to another server.'

const can_not_queue_full = 'telCAN_NOT_QUEUE_FULL'
const can_not_queue_full_message = 'The transaction did not meet the open ledger cost and the server did not queue this transaction because this server\'s transaction queue is full. You could increase the Fee and try again, try again later, or try submitting to a different server. The new transaction must have a higher transaction cost, as measured in fee levels, than the transaction in the queue with the smallest transaction cost.'

const failed_processing = 'telFAILED_PROCESSING'
const failed_processing_message = 'An unspecified error occurred when processing the transaction.'

const insuf_fee_p = 'telINSUF_FEE_P'
const insuf_fee_p_message = 'The Fee from the transaction is not high enough to meet the server\'s current transaction cost requirement, which is derived from its load level.'

const local_error = 'telLOCAL_ERROR'
const local_error_message = 'Unspecified local error.'

const no_dst_partial = 'telNO_DST_PARTIAL'
const no_dst_partial_message = 'The transaction is an XRP payment that would fund a new account, but the tfPartialPayment flag was enabled. This is disallowed.'

export const telCodes: ErrorMap = {
    [bad_domain]: bad_domain_message,
    [bad_path_count]: bad_path_count_message,
    [bad_public_key]: bad_public_key_message,
    [can_not_queue]: can_not_queue_message,
    [can_not_queue_balance]: can_not_queue_balance_message,
    [can_not_queue_blocks]: can_not_queue_blocks_message,
    [can_not_queue_blocked]: can_not_queue_blocked_message,
    [can_not_queue_fee]: can_not_queue_fee_message,
    [can_not_queue_full]: can_not_queue_full_message,
    [failed_processing]: failed_processing_message,
    [insuf_fee_p]: insuf_fee_p_message,
    [local_error]: local_error_message,
    [no_dst_partial]: no_dst_partial_message
}