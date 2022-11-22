import React from 'react';
import stl from './Card.module.css'
import Home from "../../Img/Home.jpg"

export default function Vgcard({ name, image, genres, rating }) {

    if (genres.length > 2) { genres = genres.slice(0, 2) }
    if (genres.length === 1) {
        genres = genres.toString()
    } else {
        genres = genres.toString() + " (...)"
    }

    return (

        <div className={stl.container}>
            <div className={stl.card}>
                <h4>{name}</h4>
                <p>{genres}</p>
                <img className={stl.imag} src={image ? image : Home} alt='Not Found' />
                <p className='rating'>{rating}</p>
            </div>
        </div>
    )
}