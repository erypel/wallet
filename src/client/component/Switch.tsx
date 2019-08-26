import React from 'react'
import Input from './Input'
import '../css/Switch.css'

interface Props {
    id: string
    className?: string
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void
    onLabel?: string
    offLabel?: string
    isOn?: boolean
}

export default class Switch extends React.PureComponent<Props> {
   render() {
        const { props } = this
        const { id, className, onChange, onLabel, offLabel, isOn } = props
        return <label className={`switch ${className}`}>
            <Input type="checkbox" id={id} value={isOn !== undefined ? isOn : false} onChange={onChange} defaultChecked={isOn}/>
            <div className="slider round">
                <span className="on">{onLabel}</span>
                <span className="off">{offLabel}</span>
            </div>
        </label>
    }
}