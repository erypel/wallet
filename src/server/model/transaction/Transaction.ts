import Instructions from '../Instructions'

export default interface Transaction {
  prepare(address: string, transaction: object, instructions?: Instructions): Promise<object>

  // TODO these go somewhere else
  // sign() {
  //   //TODO
  // }

  // function submit() {

  // }

  // function verify() {
    
  // }
}
