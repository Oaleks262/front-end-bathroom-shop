import React from "react";
import './Main.css';
import Hero from "../../components/Hero/Hero";
import Reviers from "../../components/Reviers/Reviers";
import Minimarket from "../../components/Minimarket/Minimarket";
import Different from "../../components/Different/Different";
import Feedback from "../../components/Feedback/Feedback";
import AboutFeedback from "../../components/AboutFeedback/AboutFeedback";
import Footer from "../../components/Footer/Footer";
import Shopping from "../../components/Shopping/Shopping"

const Main = () =>{

    return(

        <div className="main">
            <Hero/>
            <Reviers/>
            <Minimarket/>
            <Different/>
            <Feedback/>
            <AboutFeedback/>
            <Footer/>
            <Shopping/>
        </div>
        

    )
    
    }
    
    export default Main;