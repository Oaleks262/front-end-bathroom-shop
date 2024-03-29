import React from "react";
import HeaderWhite from '../Header/HeaderWhite';
import Footer from "../Footer/Footer";
import HeaderMobile from '../Header/HeaderMobile';
import './Processing.css'

const Processing = () =>{


    return(
        <div className="processing">
            <div className='content-padding'>
                <HeaderWhite/>
                <HeaderMobile/>
                <div className="content-processing">
                    <h2>
                        Згода на обробку персональних даних
                    </h2>
                    <p>
                    Покупець, оформляючи замовлення на сайті інтернет-магазину <a href="https://front-end-bathroom-shop.vercel.app/">«front-end-bathroom-shop.vercel.app»</a>, зобов'язується прийняти 
                    Згоду на обробку персональних даних згідно зі ст. 6 Закону України 
                    «Про захист персональних даних» від 01.06.2010 р №2297-VI. 
                    Прийняттям даного Згоди є оформлення замовлення і внесення Покупцем своїх даних. 
                    Покупець надає свою згоду власникам інтернет-магазину <a href="https://front-end-bathroom-shop.vercel.app/">«front-end-bathroom-shop.vercel.app»</a> на обробку своїх персональних даних з наступними умовами:
                    </p>
                    <ol>
                        <li>Згода дається на обробку наступних персональних даних: прізвище, ім'я, по батькові; адреса проживання; номери контактних телефонів;</li>
                        <li>Метою обробки персональних даних є - продаж товарів з сайту, а також обробка замовлень Покупця.</li>
                        <li>Підставою для обробки персональних даних є ст.6 Закону України «Про захист персональних даних» від 01.06.2010 р №2297-VI. В ході обробки з персональними даними будуть здійснені наступні дії: збір, систематизація, накопичення, зберігання, уточнення, використання, знищення.</li>
                        <li>Покупець надає свою згоду на передачу персональних даних третім особам без попереднього повідомлення Покупця, якщо це пов'язано з обробкою або доставкою замовлення Покупця.</li>
                        <li>Персональні дані обробляються до ліквідації інтернет-магазину.</li>
                        <li>Згода може бути відкликано Покупцем, шляхом направлення письмової заяви на електронну адресу <a href="mailto:black.street818@gmail.com">black.street818@gmail.com</a>, в темі листа слід вказати «Відмова від обробки персональних даних».</li>
                        <li>Ця згода діє весь час до моменту припинення обробки персональних даних, зазначених у п.5 та п.6 даного Згоди.</li>
                    </ol>
                </div>
                <Footer/>
            </div>
        </div>
    )

}

export default Processing;