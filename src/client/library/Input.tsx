import React from 'react'

type InputTypes = 'text' | 'number' | 'submit' | 'password' | 'checkbox'

interface InputProps {
    id: string
    type: InputTypes
    value: any
    placeHolder?: any
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void
    className?: string
    autoComplete?: 'on' | 'off'
    required?: true | false
}

const Input = (props: InputProps) => {
    const { type, value, onChange, className, id, autoComplete, required, placeHolder } = props
    return (
        <input 
            className={className} 
            type={type} 
            id={id} 
            value={value}
            placeholder={placeHolder}
            onChange={onChange} 
            autoComplete={autoComplete ? autoComplete : "off"}
            required={required}
        />
)}
export default Input