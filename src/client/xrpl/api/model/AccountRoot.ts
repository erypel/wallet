export default interface AccountRoot {
    LedgerEntryType: string
    Account: string
    Balance: string
    Flags: Set<number>
    OwnerCount: number
    PreviousTxnID: string
    PreviousTxnLgrSeq: number
    Sequence: number
    AccountTxnID?: string
    Domain?: string
    EmailHash?: string
    MessageKey?: string
    RegularKey?: string
    TickSize?: number
    TransferRate?: number
    WalletLocator?: string
    WalletSize?: number
}

/**
 * Enable rippling on this addresses's trust lines by default. Required for 
 * issuing addresses; discouraged for others.
 */
export const lsf_DEFAULT_RIPPLE = 8388608

/**
 * This account can only receive funds from transactions it sends, and from 
 * preauthorized accounts. (It has DepositAuth enabled.)
 */
export const lsf_DEPOSIT_AUTH = 16777216

/**
 * Disallows use of the master key to sign transactions for this account.
 */
export const lsf_DISABLE_MASTER = 1048576

/**
 * Client applications should not send XRP to this account. Not enforced by 
 * rippled.
 */
export const lsf_DISALLOW_XRP = 524288

/**
 * All assets issued by this address are frozen.
 */
export const lsf_GLOBAL_FREEZE = 4194304

/**
 * This address cannot freeze trust lines connected to it. Once enabled, 
 * cannot be disabled.
 */
export const lsf_NO_FREEZE = 2097152

/**
 * The account has used its free SetRegularKey transaction.
 */
export const lsf_PASSWORD_SPENT = 65536

/**
 * This account must individually approve other users for those users to hold 
 * this account's issuances.
 */
export const lsf_REQUIRE_AUTH = 262144

/**
 * Requires incoming payments to specify a Destination Tag.
 */
export const lsf_REQUIRE_DEST_TAG = 131072