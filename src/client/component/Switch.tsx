import React from 'react'
import Input from '../library/Input'

interface Props {
    id: string
    defaultValue?: boolean
    onValue?: string
    offValue?: string
    className?: string
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void
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
        const { id, onValue, offValue, className, onChange } = props
        return <label className={`switch ${className}`}>
            {/* {onValue && isOn && <div>{onValue}</div>} */}
            <Input type="checkbox" id={id} value={isOn || false} onClick={this.onClick} onChange={onChange}/>
            {/* {offValue && isOn && <div>{offValue}</div>} */}
            <span className={"slider round"} />
        </label>
    }
}