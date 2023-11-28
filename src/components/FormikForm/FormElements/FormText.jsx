import React from 'react'

const FormText = ({ name, value }) => {
    return (
        <div className='form-text'>
            <h3 className='form-text-header'>{name}</h3>
            <div className='form-text-value'>{value}</div>
        </div>
    )
}

export default FormText
