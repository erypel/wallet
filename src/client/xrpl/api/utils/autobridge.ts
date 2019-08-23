import { issuers } from './issuers'
import { AsksAndBids } from '../model/transaction/Orderbook/Orderbook'
import Ask from '../model/transaction/Orderbook/Ask'
import Bid from '../model/transaction/Orderbook/Bid'

export async function autoBridge(takerGets: string, takerPays: string, leftBook: AsksAndBids, rightBook: AsksAndBids) {
    var orderbook: AsksAndBids = {
      asks: [],
      bids: []
    }
  
    var bids1 = collectOffers(leftBook.bids)
    var bids2 = collectOffers(rightBook.bids)
    var asks1 = collectOffers(leftBook.asks)
    var asks2 = collectOffers(rightBook.asks)
  
    // Sort the bid/asks by price
    bids1.sort(function(a: any, b: any) {
      return  b.price - a.price;
    });
    asks1.sort(function(a: any, b: any) {
        return a.price - b.price;
    });
    bids2.sort(function(a: any, b: any) {
        return  b.price - a.price;
    });
    asks2.sort(function(a: any, b: any) {
        return a.price - b.price;
    });
  
    buildBook(asks1, bids2, takerGets, takerPays, orderbook, false)
    buildBook(bids1, asks2, takerGets, takerPays, orderbook, true)
  
    return orderbook
  }
  
  function buildBook(offers1: any[], offers2: any[], takerGets: string, takerPays: string, book: AsksAndBids, isBuy: boolean) {
    const takerGetsIssuer = issuers[takerGets][0]
    const takerPaysIssuer = issuers[takerPays][0]
    var j = 0 // to iterate through offers2
    var i = 0 // iterate through offers1
    while( i < offers1.length && j < offers2.length) {
      var symbol1 = offers1[i].qty
      var totalSymbol1Sold = 0
      var symbol2Received = 0
      const symbol1PriceInXRP = offers1[i].price // XRP/symbol1
      
      // cross the bid/asks
      while(symbol1 > 0 && j < offers2.length) {
        if(offers2[j].qty<=0) { // Ignore empty orders
          j++
          break
        }
        const symbol2AvailableToBuy = offers2[j].qty
        const symbol2PriceInXRP = offers2[j].price // XRP/symbol2
        const symbol2PriceInSymbol1 = Number(symbol2PriceInXRP) / Number(symbol1PriceInXRP) // symbol1/symbol2 = 1/(XRP/symbol1)*XRP/symbol2
        const symbol2ConvertedToSymbol1 = symbol2AvailableToBuy * symbol2PriceInSymbol1
        const symbol1Sold = Math.max(0, Math.min(symbol1, symbol2ConvertedToSymbol1))
        symbol1 -= symbol1Sold
        totalSymbol1Sold += symbol1Sold
        const symbol1SoldConvertedSymbol2 = symbol1Sold / symbol2PriceInSymbol1
        symbol2Received += symbol1SoldConvertedSymbol2
        offers2[j].qty -= symbol1SoldConvertedSymbol2
      }
      
      
      if (isBuy){
        // Add this the left side of the main book
        book.bids[book.bids.length] = {
          specification: {
            quantity: { 
              currency: takerGets,
              counterparty: takerGetsIssuer,
              value: totalSymbol1Sold.toString() 
            },
            totalPrice: {
              currency: takerPays,
              counterparty: takerPaysIssuer,
              value: symbol2Received.toString() 
            },
            direction: "BUY"
          }
        }
      } else{
        // Add this the right side of the main book
        book.asks[book.asks.length] = {
          specification: {
            quantity: {
              currency: takerPays,
              counterparty: takerPaysIssuer,
              value: totalSymbol1Sold.toString()
            },
            totalPrice: {
              currency:takerGets, 
              counterparty: takerGetsIssuer, 
              value: symbol2Received.toString()},
            direction: "SELL"
          }
        }
      }
      
      offers1[i].qty = symbol1
      if(symbol1 <= 0) { i++ }
    }
  }
  
  function collectOffers(offers: Bid[] | Ask[]){
    var accuracy = 8
    var collected = []
    for(var i = 0; i < offers.length; i++) {
      if(i < offers.length && Number(offers[i].specification.quantity.value) !== 0) {
        var offer = 0
        var q1 = 0
        var counterparty1 = ""
        var counterparty2 = ""
        var s1 = ""
        var s2 = ""
        if(offers[i].state !== undefined && offers[i].state!!.fundedAmount !== undefined 
          && Number(offers[i].state!!.fundedAmount.value) > 0) {
            offer = (1.00000000 * Number(offers[i].specification.totalPrice.value)) 
              / (1.00000000 * Number(offers[i].specification.quantity.value))
            counterparty1 = "" + offers[i].specification.quantity.counterparty
            counterparty2 = "" + offers[i].specification.totalPrice.counterparty
            q1 = Number(offers[i].state!!.fundedAmount.value) / offer
            s1 = offers[i].specification.quantity.currency 
              + (counterparty1 !== undefined && (!(offers[i].specification.quantity.currency in issuers) 
              || (issuers[offers[i].specification.quantity.currency].length>0))? "."+counterparty1:"")
            s2 = offers[i].specification.totalPrice.currency 
              + (counterparty2 !== undefined && (!(offers[i].specification.totalPrice.currency in issuers) 
              || (issuers[offers[i].specification.totalPrice.currency].length>0))? "."+counterparty2:"")
        }
        else {
            offer = (1.00000000 * Number(offers[i].specification.totalPrice.value)) / (1.00000000 * Number(offers[i].specification.quantity.value))
            counterparty1 = "" + offers[i].specification.quantity.counterparty
            counterparty2 = "" + offers[i].specification.totalPrice.counterparty
            q1 = Number(offers[i].specification.quantity.value)
            s1 = offers[i].specification.quantity.currency 
              + (counterparty1 !== undefined && (!(offers[i].specification.quantity.currency in issuers) 
              || (issuers[offers[i].specification.quantity.currency].length>0))? "."+counterparty1:"");
            s2 = offers[i].specification.totalPrice.currency 
              + (counterparty2 !== undefined && (!(offers[i].specification.totalPrice.currency in issuers) 
              || (issuers[offers[i].specification.totalPrice.currency].length>0))? "."+counterparty2:"");
            
        }
          collected[collected.length] = {
            direction: offers[i].specification.direction, 
            counterparty: counterparty1, 
            counterparty2: counterparty2, 
            qty: parseFloat(q1.toString()),
            symbol1complete: s1, 
            symbol2complete: s2, 
            symbol1: offers[i].specification.quantity.currency, 
            symbol2: offers[i].specification.totalPrice.currency, 
            price: (offer).toFixed(accuracy)
          }
      }
    }
    return collected
  }