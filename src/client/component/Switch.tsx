import React from 'react'
import Input from '../library/Input'

interface Props {
    id: string
    className?: string
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void
}

export default class Switch extends React.PureComponent<Props> {
   render() {
        const { props } = this
        const { id, className, onChange } = props
        return <label className={`switch ${className}`}>
            <Input type="checkbox" id={id} value={false} onChange={onChange}/>
            <span className={"slider round"} />
        </label>
    }
}