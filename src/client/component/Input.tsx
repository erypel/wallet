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
    step?: number
    maxLength?: number
    defaultChecked?: boolean
}

const Input = (props: InputProps) => {
    const { 
        type, value, onChange, className, id, autoComplete, required, placeHolder,
        step, maxLength, defaultChecked 
    } = props
    return (
        <input 
            className = {className} 
            type = {type} 
            id = {id} 
            value = {value}
            placeholder = {placeHolder}
            onChange = {onChange} 
            autoComplete = {autoComplete ? autoComplete : "off"}
            required = {required}
            step = {type === 'number' ? step : undefined}
            maxLength = {maxLength}
            defaultChecked={defaultChecked}
        />
)}
export default Input