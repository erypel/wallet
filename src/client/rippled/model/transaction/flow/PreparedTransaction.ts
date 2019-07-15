import Instructions from "../../Instructions";

export default interface PreparedTransaction {
    txJSON: string
    instructions?: Instructions
}