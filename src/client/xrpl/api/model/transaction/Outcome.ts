export default interface Outcome {
    result: string
    fee: number
    balanceChanges: any
    orderbookChanges: any[]
    ledgerVersion: number
    indexInLedger: number
    channelChanges: object
    deliveredAmount: object
    timestamp: any
    rawTransaction: string
}