import React from 'react'

type InputTypes = 'text' | 'number' | 'submit' | 'password'

interface InputProps {
    id: string
    type: InputTypes
    value: any
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void
    className?: string
    autoComplete?: 'on' | 'off'
    required?: true | false
}

const Input = (props: InputProps) => {
    const { type, value, onChange, className, id, autoComplete, required } = props
    return (
        <input 
            className={className} 
            type={type} 
            id={id} 
            value={value}
            onChange={onChange} 
            autoComplete={autoComplete ? autoComplete : "off"}
            required={required}
        />
)}
export default Input