import React from "react";
import './Main.css';
import Hero from "../../components/Hero/Hero";
import Reviers from "../../components/Reviers/Reviers";
import Minimarket from "../../components/Minimarket/Minimarket";

const Main = () =>{

    return(
        <div className="main">
            <Hero/>
            <Reviers/>
            <Minimarket/>
        </div>
    )
    
    }
    
    export default Main;