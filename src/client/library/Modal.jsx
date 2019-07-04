import React from 'react'
import Button from './Button'
import './Modal.css'

const modal = (props) => {
    const {title, children, onClose} = props
    return (
        <div>
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h3>{title}</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <p>
                        {children}
                    </p>
                </div>
                <div className="modal-footer">
                    <Button onClick={onClose} buttonText="Close"/>
                </div>
            </div>
        </div>
    )
}

export default modal;