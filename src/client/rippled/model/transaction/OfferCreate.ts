import Transaction from "./Transaction";
import { TransactionBuilder } from "./TransactionBuilder";

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export default class OfferCreate extends Transaction {

    constructor(builder: TransactionBuilder) {
        super(builder)
    }

}