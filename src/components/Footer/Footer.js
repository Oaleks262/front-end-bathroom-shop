import React from "react";
import './Footer.css'
import instagramicon from '../../assets/img/landing/footer/insta-svgrepo-com.svg'
import tiktokicon from '../../assets/img/landing/footer/tiktok-svgrepo-com.svg'
import phone from '../../assets/img/landing/footer/call.svg'
import mail from '../../assets/img/landing/footer/mail.svg'


const Footer = () =>{

return(
    <div className="footer">
        <div className='content-padding'>
            <div className="footer-content">
                <div className="footer-text">
                    <h2>Bathroom shop</h2>
                    <p>
                    Ласкаво просимо до "Bathroom shop" – вашого унікального магазину для ванни, 
                    де кожен продукт створений для забезпечення неперевершеного ритуалу відпочинку. 
                    Від шипучих сумішей та морської солі до ароматних бомбочок та елегантних подарункових боксів, 
                    ми допомагаємо вам зробити ваші ванни особливими та надихаючими моментами самопідтримки. 
                    Поглибіться у світ "Bathroom shop" та відкрийте для себе найвищий стандарт розкішного відпочинку вдома.</p>
                    <div className="footer-text-icon">
                        <a href="https://www.instagram.com/black_street_191/" target="_blank"><img src={instagramicon}/></a>
                        <a href="https://www.tiktok.com/@black_street_191" target="_blank"><img src={tiktokicon}/></a>
                    </div>
                </div>
                <div className="footer-contact">
                    <h2>Наші понтакти</h2>
                    <a href="tel:+380686085545" target="_blank"><img src={phone}/> Номер телефону</a>
                    <a href="mailto:black.street818@gmail.com" target="_blank"><img src={mail}/> Електрона пошта</a>
                </div>
            </div>
        </div>
    </div>
)

}

export default Footer;