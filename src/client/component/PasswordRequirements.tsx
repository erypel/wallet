import React from 'react'

const PasswordRequirements = () => {
    return <div className="ul-no-style">
        <ul>
            <li>Passwords Requirements:</li>
            <li>At least one uppercase english letter [A-Z]</li>
            <li>At least one lowercase english letter [a-z]</li>
            <li>At least one digit [0-9]</li>
            <li>At least one special character [#?!@ $%^&*-]</li>
            <li>Minimum length 10, maximum length 128</li>
        </ul>
    </div>
}

export default PasswordRequirements