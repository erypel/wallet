import { BookOfferBuilder } from './BookOfferBuilder'
import { BookOffer } from './BookOffer'
import toJsonObject from '../../../../../utils/toJsonObject'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

type TakerGets = {
    currency: string
    issuer?: string
}

type TakerPays = {
    currency: string
    issuer?: string
}

/**
 * DEPRECATED
 * 
 * @param taker an address
 * @param gets a three letter currency code
 * @param pays a three letter currency code
 */
export default async function bookOffers(taker: string, gets: string, pays: string) {
    const takerGets = makeTakerGets(taker, gets)
    const takerPays = makeTakerPays(taker, pays)
    const bookOffer = buildBookOffer(takerGets, takerPays)
    const bookOfferJson = toJsonObject(bookOffer)
    //THIS NEEDS TO BE SENT AS A POST TO AS JSONRPC
}

function buildBookOffer(takerGets: object, takerPays: object): BookOffer {
    const builder = new BookOfferBuilder(takerGets, takerPays).setTaker('r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59')
    return builder.build()
}

function makeTakerGets(taker: string, gets: string): TakerGets {
    if (gets === 'XRP') {
        return { currency: gets }
    } else {
        return {
            currency: gets,
            issuer: taker
        }
    }
}

function makeTakerPays(taker: string, pays: string): TakerPays {
    if (pays === 'XRP') {
        return { currency: pays }
    } else {
        return {
            currency: pays,
            issuer: taker
        }
    }
}

