import Transaction from '../Transaction'
import { TransactionBuilder } from '../TransactionBuilder'
import { PaymentBuilder } from './PaymentBuilder'
import Amount from '../../Amount'

export default class Payment extends Transaction {
  Amount: Amount | string
  Destination: string
  DestinationTag?: number
  InvoiceId?: string
  Paths?: string
  SendMax?: Amount
  DeliverMin?: Amount

  constructor(builder: TransactionBuilder, paymentBuilder: PaymentBuilder) {
    super(builder);
    this.Amount = paymentBuilder.amount
    this.Destination = paymentBuilder.destination
    this.DestinationTag = paymentBuilder.destinationTag
    this.InvoiceId = paymentBuilder.invoiceId
    this.Paths = paymentBuilder.paths
    this.SendMax = paymentBuilder.sendMax
    this.DeliverMin = paymentBuilder.deliverMin
  }
}
