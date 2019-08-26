import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../store/rootReducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import Menu from '../component/Menu'
import { setTradingPair } from '../store/orderbook/actions'

interface Props {
    baseCurrency: string,
    quoteCurrency: string,
    setTradingPair: (base: string, quote: string) => void
    className?: string
}

// Add new currency pairs here:
const currencyPairs = [
    ['XRP', 'USD'],
    ['XRP', 'BTC'],
    ['XRP', 'ETH'],
    ['USD', 'BTC'],
    ['XYZ', 'XRP']
]

class TradingPairPicker extends React.PureComponent<Props> {
    handleClick(base: string, quote: string) {
        this.props.setTradingPair(base, quote)
    }

    mapCurrencyPairs = () => {
        return currencyPairs.map((pair: string[], idx: number) => {
            const base = pair[0]
            const quote = pair[1]
            return <div key={idx} onClick={() => this.handleClick(base, quote)}>
                {`${base}/${quote}`}
            </div>
        })
    }

    render() {
        const { baseCurrency, quoteCurrency, className } = this.props

        return <Menu 
            title={`${baseCurrency}/${quoteCurrency}`} 
            className={className}
            >
                {this.mapCurrencyPairs()}
            </Menu>
    }
}

const mapStateToProps = (store: AppState) => {
    const { baseCurrency, quoteCurrency } = store.orderbook
    return {
        baseCurrency: baseCurrency,
        quoteCurrency: quoteCurrency
    
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        setTradingPair: (base: string, quote: string) => 
            dispatch(setTradingPair(base, quote))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradingPairPicker)