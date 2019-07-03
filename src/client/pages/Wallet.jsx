import React from 'react'
import Button from '../library/Button'
import Dropdown from '../library/Dropdown'

export default class Wallet extends React.PureComponent {
    currencies = [
        {
            id: 0,
            title: 'XRP',
            selected: false,
            key: 'currency'
        },
        {
          id: 1,
          title: 'USD',
          selected: false,
          key: 'currency'
        }
      ];

    render() {
        return (<div>
                <label>Balance <Dropdown
                    title="Select currency"
                    list={this.currencies}
                /></label>
                <label>Value<Dropdown
                    title="Select currency"
                    list={this.currencies}
                /></label>
                <Button buttonText='Send'/>
                <Button buttonText='Receive'/>
            </div>);
    }
}