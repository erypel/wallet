import formatBidsAndAsks from './formatBidsAndAsks'
import { AsksAndBids } from '../model/transaction/Orderbook/Orderbook'
import { orderbookService } from '../../../services/orderbookService'
import { issuers } from './issuers'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export default async function subscribeToBook(takerPays: string, takerGets: string): Promise<AsksAndBids> {
    return await api.connect().then(async () => { // Omit this if you are already connected

    api.connection.on('transaction', (tx: any) => {
        const { transaction, meta, ledger_index, validated } = tx
        const { TransactionType, Account } = transaction
        switch(transaction.TransactionType) {
            case 'OfferCreate':
              return orderbookService.handleIncomingOrderCreate(transaction)
            case 'OfferCancel':
              return orderbookService.handleIncomingOrderCancel(transaction)
        }
        console.log(TransactionType + " transaction sent by " +
                    Account +
                    "\n  Result: " + meta.TransactionResult +
                    " in ledger " + ledger_index +
                    "\n  Validated? " + validated)
    })
    
    if(takerPays === 'XRP' || takerGets === 'XRP') {
      return await doSubscription(takerGets, takerPays)
    } else {
      var currentOrderbook: AsksAndBids = {
        asks: [],
        bids: []
      }

      const leftBook = await doSubscription(takerGets, 'XRP')
      const rightBook = await doSubscription('XRP', takerPays)

      // this is from here: https://github.com/pftq/TheWorldExchange/blob/master/20181206.js
      // super gross and needs a heavy refactor. good starting point, though

      var accuracy = 8;  
      // mainbook = symbol1 for symbol2 - ex: BTC for USD
      // bridgedBook1 = symbol1 for XRP - ex: BTC for XRP
      // bridgedBook2 = symbol2 for XRP - ex: USD for XRP
      // mainbook ask = selling symbol2 for xrp + buying symbol1 with XRP = bridgedBook2 bid + bridgedBook1 ask
      // mainbook bid = selling symbol1 for xrp + buying symbol2 with XRP = bridgedBook1 bid + bridgedBook2 ask
      
      // collect all the bids and asks first and sort them
      var bids1 = [];
      var bids2 = [];
      var asks1 = [];
      var asks2 = [];
      
      var orderbook = leftBook; // symbol1 for xrp
      
      // Bid side of the orderbook
      for(var i=0; i<orderbook.bids.length; i++) {
        if(i<orderbook.bids.length && Number(orderbook.bids[i].specification.quantity.value)!=0) {
          var row1 = ""; var bid = 0; var q1 = 0; var counterparty = ""; var counterparty2 = ""; var s1 = ""; var s2="";
          if(orderbook.bids[i].state!=null && orderbook.bids[i].state!!.fundedAmount!=null && Number(orderbook.bids[i].state!!.fundedAmount.value)>0) {
              bid = (1.00000000*Number(orderbook.bids[i].specification.totalPrice.value))/(1.00000000*Number(orderbook.bids[i].specification.quantity.value));
              counterparty = ""+orderbook.bids[i].specification.quantity.counterparty;
              counterparty2 = ""+orderbook.bids[i].specification.totalPrice.counterparty;
              q1=Number(orderbook.bids[i].state!!.fundedAmount.value) / bid;
              s1 = orderbook.bids[i].specification.quantity.currency + (counterparty!="undefined" && (!(orderbook.bids[i].specification.quantity.currency in issuers) || (issuers[orderbook.bids[i].specification.quantity.currency].length>0))? "."+counterparty:"");
              s2 = orderbook.bids[i].specification.totalPrice.currency + (counterparty2!="undefined" && (!(orderbook.bids[i].specification.totalPrice.currency in issuers) || (issuers[orderbook.bids[i].specification.totalPrice.currency].length>0))? "."+counterparty2:"");
            
          }
          else {
              bid = (1.00000000*Number(orderbook.bids[i].specification.totalPrice.value))/(1.00000000*Number(orderbook.bids[i].specification.quantity.value));
              counterparty = ""+orderbook.bids[i].specification.quantity.counterparty;
              counterparty2 = ""+orderbook.bids[i].specification.totalPrice.counterparty;
              q1=Number(orderbook.bids[i].specification.quantity.value);
              s1 = orderbook.bids[i].specification.quantity.currency + (counterparty!="undefined" && (!(orderbook.bids[i].specification.quantity.currency in issuers) || (issuers[orderbook.bids[i].specification.quantity.currency].length>0))? "."+counterparty:"");
              s2 = orderbook.bids[i].specification.totalPrice.currency + (counterparty2!="undefined" && (!(orderbook.bids[i].specification.totalPrice.currency in issuers) || (issuers[orderbook.bids[i].specification.totalPrice.currency].length>0))? "."+counterparty2:"");
              
          }
            
            bids1[bids1.length] = {direction:orderbook.bids[i].specification.direction, counterparty:counterparty, counterparty2:counterparty2, qty:parseFloat(q1.toString()), symbol1complete:s1, symbol2complete:s2, symbol1:orderbook.bids[i].specification.quantity.currency, symbol2:orderbook.bids[i].specification.totalPrice.currency, price:(bid).toFixed(accuracy)};
        }
      }
      
      for(var i=0; i<orderbook.asks.length; i++) { // iterate through bridgedBook1 asks
        
        // s1 is symbol1, s2 is XRP
        if(Number(orderbook.asks[i].specification.quantity.value)!=0) {
          var row2 = ""; var ask = 0; var counterparty = ""; var counterparty2 = ""; var q1 = 0; var s1 = ""; var s2 = "";
          if(orderbook.asks[i].state!=null && orderbook.asks[i].state!!.fundedAmount!=null && Number(orderbook.asks[i].state!!.fundedAmount.value)>0) {
              ask = (1.00000000*Number(orderbook.asks[i].specification.totalPrice.value))/(1.00000000*Number(orderbook.asks[i].specification.quantity.value));
              counterparty = ""+orderbook.asks[i].specification.quantity.counterparty;
              counterparty2 = ""+orderbook.asks[i].specification.totalPrice.counterparty;
              q1=Number(orderbook.asks[i].state!!.fundedAmount.value);
              s1 = orderbook.asks[i].specification.quantity.currency + (counterparty!="undefined" && (!(orderbook.asks[i].specification.quantity.currency in issuers) || (issuers[orderbook.asks[i].specification.quantity.currency].length>0))? "."+counterparty:"");
              s2 = orderbook.asks[i].specification.totalPrice.currency + (counterparty2!="undefined" && (!(orderbook.asks[i].specification.totalPrice.currency in issuers) || (issuers[orderbook.asks[i].specification.totalPrice.currency].length>0))? "."+counterparty2:"");
          }
          else {
              ask = (1.00000000*Number(orderbook.asks[i].specification.totalPrice.value))/(1.00000000*Number(orderbook.asks[i].specification.quantity.value));
              counterparty = ""+orderbook.asks[i].specification.quantity.counterparty;
              counterparty2 = ""+orderbook.asks[i].specification.totalPrice.counterparty;
              q1=Number(orderbook.asks[i].specification.quantity.value);
              s1 = orderbook.asks[i].specification.quantity.currency + (counterparty!="undefined" && (!(orderbook.asks[i].specification.quantity.currency in issuers) || (issuers[orderbook.asks[i].specification.quantity.currency].length>0))? "."+counterparty:"");
              s2 = orderbook.asks[i].specification.totalPrice.currency + (counterparty2!="undefined" && (!(orderbook.asks[i].specification.totalPrice.currency in issuers) || (issuers[orderbook.asks[i].specification.totalPrice.currency].length>0))? "."+counterparty2:"");
          }
          
          // bridgedBook1 asks
          asks1[asks1.length] = {direction:orderbook.asks[i].specification.direction, counterparty:counterparty, counterparty2:counterparty2, qty:parseFloat(q1.toString()), symbol1complete:s1, symbol2complete:s2, symbol1:orderbook.asks[i].specification.quantity.currency, symbol2:orderbook.asks[i].specification.totalPrice.currency, price:(ask).toFixed(accuracy)};
        }
      }
      
      var orderbook = rightBook; // xrp for symbol2 
      for(var i=0; i<orderbook.bids.length; i++) {
        if(i<orderbook.bids.length && Number(orderbook.bids[i].specification.quantity.value)!=0) {
          var row1 = ""; var bid = 0; var q1 = 0; var counterparty = ""; var counterparty2 = ""; var s1 = ""; var s2="";
          if(orderbook.bids[i].state!=null && orderbook.bids[i].state!!.fundedAmount!=null && Number(orderbook.bids[i].state!!.fundedAmount.value)>0) {
              bid = (1.00000000*Number(orderbook.bids[i].specification.totalPrice.value))/(1.00000000*Number(orderbook.bids[i].specification.quantity.value));
              counterparty = ""+orderbook.bids[i].specification.quantity.counterparty;
              counterparty2 = ""+orderbook.bids[i].specification.totalPrice.counterparty;
              q1=Number(orderbook.bids[i].state!!.fundedAmount.value) / bid;
              s1 = orderbook.bids[i].specification.quantity.currency + (counterparty!="undefined" && (!(orderbook.bids[i].specification.quantity.currency in issuers) || (issuers[orderbook.bids[i].specification.quantity.currency].length>0))? "."+counterparty:"");
              s2 = orderbook.bids[i].specification.totalPrice.currency + (counterparty2!="undefined" && (!(orderbook.bids[i].specification.totalPrice.currency in issuers) || (issuers[orderbook.bids[i].specification.totalPrice.currency].length>0))? "."+counterparty2:"");
            
          }
          else {
              bid = (1.00000000*Number(orderbook.bids[i].specification.totalPrice.value))/(1.00000000*Number(orderbook.bids[i].specification.quantity.value));
              counterparty = ""+orderbook.bids[i].specification.quantity.counterparty;
              counterparty2 = ""+orderbook.bids[i].specification.totalPrice.counterparty;
              q1=Number(orderbook.bids[i].specification.quantity.value);
              s1 = orderbook.bids[i].specification.quantity.currency + (counterparty!="undefined" && (!(orderbook.bids[i].specification.quantity.currency in issuers) || (issuers[orderbook.bids[i].specification.quantity.currency].length>0))? "."+counterparty:"");
              s2 = orderbook.bids[i].specification.totalPrice.currency + (counterparty2!="undefined" && (!(orderbook.bids[i].specification.totalPrice.currency in issuers) || (issuers[orderbook.bids[i].specification.totalPrice.currency].length>0))? "."+counterparty2:"");
              
          }
            
            bids2[bids2.length] = {direction:orderbook.bids[i].specification.direction, counterparty:counterparty, counterparty2:counterparty2, qty:parseFloat(q1.toString()), symbol1complete:s1, symbol2complete:s2, symbol1:orderbook.bids[i].specification.quantity.currency, symbol2:orderbook.bids[i].specification.totalPrice.currency, price:(bid).toFixed(accuracy)};
        }
      }
      for(var i=0; i<orderbook.asks.length; i++) { // iterate through bridgedBook2 asks
        
        // s1 is XRP, s2 is symbol2
        if(Number(orderbook.asks[i].specification.quantity.value)!=0) {
          var row2 = ""; var ask = 0; var counterparty = ""; var counterparty2 = ""; var q1 = 0; var s1 = ""; var s2 = "";
          if(orderbook.asks[i].state!=null && orderbook.asks[i].state!!.fundedAmount!=null && Number(orderbook.asks[i].state!!.fundedAmount.value)>0) {
              ask = (1.00000000*Number(orderbook.asks[i].specification.totalPrice.value)/(1.00000000*Number(orderbook.asks[i].specification.quantity.value)))
              counterparty = ""+orderbook.asks[i].specification.quantity.counterparty;
              counterparty2 = ""+orderbook.asks[i].specification.totalPrice.counterparty;
              q1 = Number(orderbook.asks[i].state!!.fundedAmount.value);
              s1 = orderbook.asks[i].specification.quantity.currency + (counterparty!="undefined" && (!(orderbook.asks[i].specification.quantity.currency in issuers) || (issuers[orderbook.asks[i].specification.quantity.currency].length>0))? "."+counterparty:"");
              s2 = orderbook.asks[i].specification.totalPrice.currency + (counterparty2!="undefined" && (!(orderbook.asks[i].specification.totalPrice.currency in issuers) || (issuers[orderbook.asks[i].specification.totalPrice.currency].length>0))? "."+counterparty2:"");
          }
          else {
              ask = (1.00000000*Number(orderbook.asks[i].specification.totalPrice.value))/(1.00000000*Number(orderbook.asks[i].specification.quantity.value));
              counterparty = ""+orderbook.asks[i].specification.quantity.counterparty;
              counterparty2 = ""+orderbook.asks[i].specification.totalPrice.counterparty;
              q1=Number(orderbook.asks[i].specification.quantity.value);
              s1 = orderbook.asks[i].specification.quantity.currency + (counterparty!="undefined" && (!(orderbook.asks[i].specification.quantity.currency in issuers) || (issuers[orderbook.asks[i].specification.quantity.currency].length>0))? "."+counterparty:"");
              s2 = orderbook.asks[i].specification.totalPrice.currency + (counterparty2!="undefined" && (!(orderbook.asks[i].specification.totalPrice.currency in issuers) || (issuers[orderbook.asks[i].specification.totalPrice.currency].length>0))? "."+counterparty2:"");
          }
          
          // bridgedBook2 asks
          asks2[asks2.length] = {direction:orderbook.asks[i].specification.direction, counterparty:counterparty, counterparty2:counterparty2, qty:parseFloat(q1.toString()), symbol1complete:s1, symbol2complete:s2, symbol1:orderbook.asks[i].specification.quantity.currency, symbol2:orderbook.asks[i].specification.totalPrice.currency, price:(ask).toFixed(accuracy)};
        }
      }
  
    
      const takerGetsIssuer = issuers[takerGets][0]
      const takerPaysIssuer = issuers[takerPays][0] //TODO
    
    // mainbook ask = selling symbol2 for xrp + buying symbol1 with XRP = bridgedBook2 bid + bridgedBook1 ask
    var j = 0; // to iterate through bridgedBook2 bids
    var i=0; // iterate through bridgedBook1 asks
    while( i<asks1.length && j<bids2.length) { // iterate through bridgedBook1 asks
      var symbol1Left = asks1[i].qty; 
      var totalSymbol1Sold = 0; 
      var symbol1PriceInXRP = asks1[i].price; // XRP/symbol1
      var symbol2Received = 0; 
      
      // cross the bid/asks
      while(symbol1Left>0 && j<bids2.length) {
        if(bids2[j].qty<=0) { // Ignore empty orders
          j++;
          break;
        }
        var symbol2AvailableToBuy = bids2[j].qty;
        var symbol2PriceInXRP = bids2[j].price; // XRP/symbol2
        var symbol2PriceInSymbol1 = Number(symbol2PriceInXRP)/Number(symbol1PriceInXRP); // symbol1/symbol2 = 1/(XRP/symbol1)*XRP/symbol2
        var symbol2ConvertedToSymbol1 = symbol2AvailableToBuy*symbol2PriceInSymbol1;
        var symbol1Sold = Math.max(0, Math.min(symbol1Left, symbol2ConvertedToSymbol1));
        symbol1Left-= symbol1Sold;
        totalSymbol1Sold += symbol1Sold;
        var symbol1SoldConvertedSymbol2 = symbol1Sold/symbol2PriceInSymbol1;
        symbol2Received += symbol1SoldConvertedSymbol2;
        bids2[j].qty-=symbol1SoldConvertedSymbol2;
      }
      
      // Add this the right side of the main book
      currentOrderbook.asks[currentOrderbook.asks.length] = {
        specification: {
          quantity: {currency: takerPays, counterparty: takerPaysIssuer, value: totalSymbol1Sold.toString()},
          totalPrice: {currency:takerGets, counterparty: takerGetsIssuer, value: symbol2Received.toString()},
          direction: "SELL"
        }
      };
      
      asks1[i].qty = symbol1Left;
      if(symbol1Left<=0) i++;
    }
    
    // mainbook bid = selling symbol1 for xrp + buying symbol2 with XRP = bridgedBook1 bid + bridgedBook2 ask
    j = 0; // to iterate through bridgedBook2 asks 
    i = 0; // iterate through bridgedBook1 bids
    while(i<bids1.length && j<asks2.length) { // iterate through bridgedBook2 bids
      var symbol1Left = bids1[i].qty; 
      var totalSymbol1Sold = 0; 
      var symbol1PriceInXRP = bids1[i].price; // XRP/symbol1
      var symbol2Received = 0; 
      
      // cross the bid/asks
      while(symbol1Left>0 && j<asks2.length) {
        if(asks2[j].qty<=0) { // Ignore empty orders
          j++;
          break;
        }
        var symbol2AvailableToBuy = asks2[j].qty;
        var symbol2PriceInXRP = asks2[j].price; // XRP/symbol2
        var symbol2PriceInSymbol1 = Number(symbol2PriceInXRP)/Number(symbol1PriceInXRP); // symbol1/symbol2 = 1/(XRP/symbol1)*XRP/symbol2
        var symbol2ConvertedToSymbol1 = symbol2AvailableToBuy*symbol2PriceInSymbol1;
        var symbol1Sold = Math.max(0, Math.min(symbol1Left, symbol2ConvertedToSymbol1));
        symbol1Left-= symbol1Sold;
        totalSymbol1Sold += symbol1Sold;
        var symbol1SoldConvertedSymbol2 = symbol1Sold/symbol2PriceInSymbol1;
        symbol2Received += symbol1SoldConvertedSymbol2;
        asks2[j].qty-=symbol1SoldConvertedSymbol2;
      }
      
      
      // Add this the left side of the main book
      currentOrderbook.bids[currentOrderbook.bids.length] = {
        specification: {
          quantity: {currency:takerGets, counterparty:takerGetsIssuer, value:totalSymbol1Sold.toString()},
          totalPrice: {currency:takerPays, counterparty:takerPaysIssuer, value:symbol2Received.toString()},
          direction: "buy"
        }
      };
      
      bids1[i].qty = symbol1Left;
      if(symbol1Left<=0) i++;
    }    
    orderbook = currentOrderbook
      return orderbook
    }
  })
}

async function doSubscription(takerGets: string, takerPays: string): Promise<AsksAndBids> {
  const takerGetsIssuer = issuers[takerGets][0]
  const takerPaysIssuer = issuers[takerPays][0] //TODO

  return await api.request('subscribe', {
    books: [ 
        {taker_pays: {currency: takerPays, issuer: takerPaysIssuer}, taker_gets: {currency: takerGets, issuer: takerGetsIssuer}, snapshot: true, both: true},
        {taker_pays: {currency: takerGets, issuer: takerGetsIssuer}, taker_gets: {currency: takerPays, issuer: takerPaysIssuer}, snapshot: true, both: true}
    ]
}).then(async (result: AsksAndBids) => {
    const orderbookInfo = {
        "base": {
          "currency": takerPays,
          "counterparty": takerPaysIssuer
        },
        "counter": {
          "currency": takerGets,
          "counterparty": takerGetsIssuer
        }
      }
    const directOffers = (result? result.asks : [])
    //const reverseOffers = (result? result.bids : [])
    const orderbook = await formatBidsAndAsks(orderbookInfo, [...directOffers])
    console.log('lookey tado', orderbook)
    return orderbook
  }).catch((error: any) => {
      console.log(error)
  })
}