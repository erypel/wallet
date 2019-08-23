import { orderbookService } from '../../../services/orderbookService'
import OrderbookStreamMessage from '../model/transaction/StreamMessages/OrderbookStreamMessage'
import OrderCancellation from '../model/transaction/OrderCancellation/OrderCancellation'

//this is a hack until unsubscribe works
const transactions = new Set()

export default function handleIncomingTransaction(tx: OrderbookStreamMessage) {
    const { transaction, meta, ledger_index, validated } = tx
          const { TransactionType, Account } = transaction

          //hack
          if(transactions.has(transaction)) {
            return
          }
          transactions.add(transaction)
          
          if (!meta) {
              throw Error('received transaction without metadata')
          }
          const { AffectedNodes } = meta
          for(var i = 0; i < AffectedNodes.length; i++) {
            const node = AffectedNodes[i]
            
            // Remove old orders when paritally filled
            if (node.ModifiedNode && node.ModifiedNode.LedgerEntryType === 'Offer') {
                const { FinalFields } = node.ModifiedNode
                const offerToRemove = {
                    LedgerEntryType: FinalFields.LedgerEntryType,
                    Flags: FinalFields.Flags,
                    Account: FinalFields.Account,
                    Sequence: FinalFields.Sequence,
                    TakerPays: node.ModifiedNode.PreviousFields.TakerPays,
                    TakerGets: node.ModifiedNode.PreviousFields.TakerGets,
                    BookDirectory: FinalFields.BookDirectory,
                    BookNode: FinalFields.BookNode,
                    OwnerNode: FinalFields.OwnerNode,
                    PreviousTxnID: FinalFields.PreviousTxnID,
                    PreviousTxnLgrSeq: FinalFields.PreviousTxnLgrSeq,
                    Expiraton: FinalFields.Expiraton
                }
                orderbookService.removeOffer(offerToRemove)
                orderbookService.addOffer(FinalFields)
            }

            // Remove filled orders
            if (node.DeletedNode && node.DeletedNode.LedgerEntryType === 'Offer') {
              orderbookService.removeOffer(node.DeletedNode.FinalFields)
            }

            // Add new orders
            if (node.CreatedNode && node.CreatedNode.LedgerEntryType === 'Offer') {
              orderbookService.addOffer(node.CreatedNode.NewFields)
            }
          }

          
          switch(transaction.TransactionType) {
              case 'OfferCancel':
                return orderbookService.handleIncomingOrderCancel(transaction as OrderCancellation)
          }
          
          console.log(TransactionType + " transaction sent by " +
                      Account +
                      "\n  Result: " + meta.TransactionResult +
                      " in ledger " + ledger_index +
                      "\n  Validated? " + validated)
}