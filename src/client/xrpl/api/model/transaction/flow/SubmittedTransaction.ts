export default interface SubmittedTransaction {
    engine_result: string
    engine_result_code: number
    engine_result_message: string
    tx_blob: string
    tx_json: object
}