import React from 'react'

interface Props {
  className?: string
  onClick: () => void
  buttonText: string
}

const Button = (props: Props) => {
 return (
  <button className={props.className} onClick={props.onClick}>{props.buttonText}</button> 
)}
export default Button