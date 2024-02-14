import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './Main.css';
import Hero from "../../components/Hero/Hero";
import Reviers from "../../components/Reviers/Reviers";
import Minimarket from "../../components/Minimarket/Minimarket";
import Different from "../../components/Different/Different";
import Feedback from "../../components/Feedback/Feedback";
import AboutFeedback from "../../components/AboutFeedback/AboutFeedback";
import Footer from "../../components/Footer/Footer";
import HeaderMobile from "../../components/Header/HeaderMobile";

const Main = () => {
    const location = useLocation();

    useEffect(() => {
        const elementId = location.hash.substring(1);
        scrollToElement(elementId);
    }, [location]);

    function scrollToElement(elementID) {
        const aboutElement = document.getElementById(elementID);
        if (aboutElement) {
            aboutElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }


    return (
        <div className="main">
            <HeaderMobile/>
            <Hero />
            <Minimarket />
            <Reviers />
            <Different />
            <Feedback />
            <AboutFeedback />
            <Footer />
        </div>
    );
}

export default Main;
