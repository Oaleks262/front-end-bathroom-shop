import React from "react";
import HeaderWhite from '../Header/HeaderWhite';
import Footer from "../Footer/Footer";
import HeaderMobile from '../Header/HeaderMobile';
import './Delivery.css'



const Delivery = () => {

    return(

        <div className="delivery">
            <div className='content-padding'>
                <HeaderWhite/>
                <HeaderMobile/>
                <div className="delivery-content">
                <div className="pay-data"> 
                    <h2>
                        Оплата за товар
                    </h2>
                    <div>
                    <h3>Повна оплата</h3>
                    <p>...</p>
                    <h3>Часткова оплата</h3>
                    <p>...</p>
                    </div>
                </div>
                <div className="delivery-data">
                    
                </div>


                </div>
                <Footer/>
            </div>
        </div>

    )

}

export default Delivery;