import React from "react";
import './Main.css';
import Hero from "../../components/Hero/Hero";
import Reviers from "../../components/Reviers/Reviers";

const Main = () =>{

    return(
        <div className="main">
            <Hero/>
            <Reviers/>
        </div>
    )
    
    }
    
    export default Main;