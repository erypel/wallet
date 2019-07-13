import React from 'react'

type InputTypes = 'text' | 'number' | 'submit'

interface InputProps {
    id: string
    type: InputTypes
    value: any
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void
    className?: string
    autoComplete?: 'on' | 'off'
}

const Input = (props: InputProps) => {
    const { type, value, onChange, className, id, autoComplete } = props
    return (
        <input 
            className={className} 
            type={type} 
            id={id} 
            value={value}
            onChange={onChange} 
            autoComplete={autoComplete ? autoComplete : "off"}
        />
)}
export default Input