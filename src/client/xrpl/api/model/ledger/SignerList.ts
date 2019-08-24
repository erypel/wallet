export default interface SignerList {
    LedgerEntryType: string
    Flags: number
    PreviousTxnID: string
    PreviousTxnLgrSeq: number
    OwnerNode: string
    SignerEntries: SignerEntry[]
    SignerListID: number
    SignerQuorum: number
}

export interface SignerEntry {
    Account: string
    SignerWeight: number
}

const lsf_ONE_OWNER_COUNT = 65536

export const SignerListFlags = {
    lsf_ONE_OWNER_COUNT
}