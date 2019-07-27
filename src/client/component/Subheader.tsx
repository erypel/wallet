import React from 'react'

interface Props {
    title: string
}

const Subheader = (props: Props) => {
    return <div className='header'>
        <h2>{props.title}</h2>
    </div>
}

export default Subheader