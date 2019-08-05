import React from 'react'
import Input from '../library/Input'

type SwitchType = 'box' | 'round'

interface Props {
    id: string
    defaultValue?: boolean
    onValue?: string
    offValue?: string
    className?: string
}

interface State {
    isOn: boolean
}

export default class Switch extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        const { defaultValue } = props
        this.state = {
            isOn: defaultValue === undefined ? false : defaultValue
        }
    }

    onClick = () => {
        this.setState({
            isOn: !this.state.isOn
        })
    }

    render() {
        const { props, state } = this
        const { isOn } = state
        const { id, onValue, offValue, className } = props
        return <label className={`switch ${className}`}>
            {/* {onValue && isOn && <div>{onValue}</div>} */}
            <Input type="checkbox" id={id} value={isOn || false} onClick={this.onClick}/>
            {/* {offValue && isOn && <div>{offValue}</div>} */}
            <span className={"slider round"} />
        </label>
    }
}