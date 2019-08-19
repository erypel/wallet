import { ErrorMap } from './ErrorMap'

const already = 'tefALREADY'
const already_message = '	The same exact transaction has already been applied.'

const bad_auth = 'tefBAD_AUTH'
const bad_auth_message = 'The key used to sign this account is not authorized to modify this account. (It could be authorized if the account had the same key set as the Regular Key.)'

const bad_auth_master = 'tefBAD_AUTH_MASTER'
const bad_auth_master_message = 'The single signature provided to authorize this transaction does not match the master key, but no regular key is associated with this address.'

const bad_ledger = 'tefBAD_LEDGER'
const bad_ledger_message = 'While processing the transaction, the ledger was discovered in an unexpected state. If you can reproduce this error, please report an issue  to get it fixed.'

const bad_quorum = 'tefBAD_QUORUM'
const bad_quorum_message = '	The transaction was multi-signed, but the total weights of all included signatures did not meet the quorum.'

const bad_signature = 'tefBAD_SIGNATURE'
const bad_signature_message = '	The transaction was multi-signed, but contained a signature for an address not part of a SignerList associated with the sending account.'

const exception = 'tefEXCEPTION'
const exception_message = 'While processing the transaction, the server entered an unexpected state. This may be caused by unexpected inputs, for example if the binary data for the transaction is grossly malformed. If you can reproduce this error, please report an issue  to get it fixed.'

const failure = 'tefFAILURE'
const failure_message = 'Unspecified failure in applying the transaction.'

const internal = 'tefINTERNAL'
const internal_message = '	When trying to apply the transaction, the server entered an unexpected state. If you can reproduce this error, please report an issue  to get it fixed.'

const invariant_failed = 'tefINVARIANT_FAILED'
const invariant_failed_message = 'An invariant check failed when trying to claim the transaction cost. Requires the EnforceInvariants amendment. If you can reproduce this error, please report an issue.'

const master_disabled = 'tefMASTER_DISABLED'
const master_disabled_message = 'The transaction was signed with the account\'s master key, but the account has the lsfDisableMaster field set.'

const max_ledger = 'tefMAX_LEDGER'
const max_ledger_message = 'The transaction included a LastLedgerSequence parameter, but the current ledger\'s sequence number is already higher than the specified value.'

const no_auth_required = 'tefNO_AUTH_REQUIRED'
const no_auth_required_message = 'The TrustSet transaction tried to mark a trustline as authorized, but the lsfRequireAuth flag is not enabled for the corresponding account, so authorization is not necessary.'

const not_multi_signing = 'tefNOT_MULTI_SIGNING'
const not_multi_signing_message = 'The transaction was multi-signed, but the sending account has no SignerList defined.'

const past_seq = 'tefPAST_SEQ'
const past_seq_message = 'The sequence number of the transaction is lower than the current sequence number of the account sending the transaction.'

const wrong_prior = 'tefWRONG_PRIOR'
const wrong_prior_message = 'The transaction contained an AccountTxnID field (or the deprecated PreviousTxnID field), but the transaction specified there does not match the account\'s previous transaction.'

export const tefCodes: ErrorMap = {
    [already]: already_message,
    [bad_auth]: bad_auth_message,
    [bad_auth_master]: bad_auth_master_message,
    [bad_ledger]: bad_ledger_message,
    [bad_quorum]: bad_quorum_message,
    [bad_signature]: bad_signature_message,
    [exception]: exception_message,
    [failure]: failure_message,
    [internal]: internal_message,
    [invariant_failed]: invariant_failed_message,
    [master_disabled]:master_disabled_message,
    [max_ledger]: max_ledger_message,
    [no_auth_required]: no_auth_required_message,
    [not_multi_signing]: not_multi_signing_message,
    [past_seq]: past_seq_message,
    [wrong_prior]: wrong_prior_message
}