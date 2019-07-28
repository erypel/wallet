import React from 'react'
import Button from '../component/Button'
import './Modal.css'

const modal = (props) => {
    const {title, children, onClose} = props
    return (
        <div>
            <div className="overlay" onClick={onClose}/>
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h3>{title}</h3>
                    <Button onClick={onClose} buttonText="x"/>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <Button onClick={onClose} buttonText="Close"/>
                </div>
            </div>
        </div>
    )
}

export default modal;