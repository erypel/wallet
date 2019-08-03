import Outcome from "../Outcome";

export default interface VerifiedTransaction {
    id: string
    address: string
    sequence: number
    type: string
    specification: object
    outcome: Outcome
}