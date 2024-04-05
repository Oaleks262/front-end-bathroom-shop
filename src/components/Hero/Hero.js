import React from 'react';
import './Hero.css'
import Header from '../Header/Header';

const Hero = () =>{
    return(
        <div className="hero">
            <div className='content-padding'>
             <div className='hero-content'>
                
            <Header></Header>
            <div className='hero-text-content'>
                <h2>Релаксуй разом з</h2>
                <h1>Bathroom shop</h1>
                <p>Тут ти можеш купити для релаксу все</p>
                <a href='/product'  className='hero-text-content-button' ></a>
            </div>
            </div>   
            </div>

        </div>
    )
}
export default Hero;