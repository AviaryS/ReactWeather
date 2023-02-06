import React from 'react';
import './style.css'

const Form = ({weatherMethod}) => {
    return (
        <form onSubmit={weatherMethod} className='weather__form'>
            <input type="text" name='city' placeholder='город' className='weather__input'/>
            <button type='submit' className='weather__button'>Получить погоду</button>
        </form>
    );
}

export default Form;