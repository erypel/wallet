import React from 'react'
import Input from './Input'

interface Props {
    id: string
    value: any
    placeHolder?: any
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void
    className?: string
    required?: true | false
}

const XrpInput = (props: Props) => {
    const { value, onChange, className, id, required, placeHolder } = props
    return (
        <Input 
            className={className} 
            type='number'
            id={id} 
            value={value}
            placeHolder={placeHolder}
            onChange={onChange} 
            autoComplete='off'
            required={required}
            step={0.000001}
        />
)}
export default XrpInput