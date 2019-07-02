import Instructions from '../Instructions'

export default interface Transaction {
  prepare(address: string, transaction: string, instructions?: Instructions): Promise<object>

  toJsonObject(): string
  // TODO these go somewhere else
  // sign() {
  //   //TODO
  // }

  // function submit() {

  // }

  // function verify() {
    
  // }
}
