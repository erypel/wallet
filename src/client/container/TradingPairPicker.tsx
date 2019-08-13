import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../store/rootReducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import Menu from '../component/Menu'

const mapStateToProps = (store: AppState) => {
    const { baseCurrency, quoteCurrency } = store.orderbook
    return {
        baseCurrency: baseCurrency,
        quoteCurrency: quoteCurrency
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        
    }
}

interface Props {
    baseCurrency: string,
    quoteCurrency: string
}

class TradingPairPicker extends React.PureComponent<Props> {
    handleClick() {
    }

    render() {
        const { baseCurrency, quoteCurrency } = this.props

        return <Menu title={baseCurrency ? `${baseCurrency}/${quoteCurrency}` : 'Select a pair'}>
                <div>XRP/USD</div>
                <div>XRP/BTC</div>
                <div>XRP/ETH</div>
            </Menu>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradingPairPicker)