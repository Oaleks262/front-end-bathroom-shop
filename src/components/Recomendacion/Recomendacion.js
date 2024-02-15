import React, { useState, useEffect } from 'react';
import './Recomendacion.css'
import HeaderMobile from '../Header/HeaderMobile';
import HeaderWhite from '../Header/HeaderWhite';
import Footer from '../Footer/Footer';
import righticon from '../../assets/img/landing/market/arrowforward.svg'




const Recomendacion = () =>{


    const [content, setContent] = useState('');

    const handleItemClick = (type) => {
        setContent(type);
    };

    return(
        <div className='recomendacion'>
            <div className='content-padding'>
                <HeaderWhite />
                <HeaderMobile/>
                    <div className='recomendacion-content' >
                            <div className='recomendacion-content-sidebar'>
                                <ul className='recomendacion-content-sidebar-ul'>
                                    <li className={`recomendacion-content-sidebar-li ${content === 'mix' ? 'on' : ''}`}><a onClick={() => handleItemClick('mix')}>Суміш<img src={righticon}/></a></li>
                                    <li className={`recomendacion-content-sidebar-li ${content === 'sold' ? 'on' : ''}`}><a onClick={() => handleItemClick('sold')}>Морська сіль<img src={righticon}/></a></li>
                                </ul>
                            </div>
                            <div className='recomendacion-content-page'>
                            {content === 'mix' && (<div className='recomendacion-content-page-mix'>
                                <h2>
                                    Cуміш
                                </h2>
                                <p>Суміш - має більшу кількість ефірних олій, ніж бомбочки. 
                                    За бажанням замінюємо ефірні олії на ароматизатори. 
                                    Суміш можна міксувати у ванній із сіллю, сухоцвітами або з додаванням бомбочок. 
                                    Прохання дотримуватися наших рекомендацій. 
                                    Якщо раптом ви використаєте більше суміші, ніж рекомендовано, магазин відповідальність за ваше здоров'я не несе.
                                    Адже шкіра кожного реагує індивідуально на усі компоненти. Не використовувати при наявності алергічних реакцій, попрілостей, ран та свіжих татуювань. 
                                    Розрахунок на 1 прийом ванни:</p>
                                    <div className='recomendacion-content-page-recom'>
                                        <p className='recomendacion-content-page-recom-p'> <b>Чиста суміш: </b></p>
                                        <p className='recomendacion-content-page-recom-p'>
                                            <br/>200г - 1-2 прийоми ванни 
                                            <br/>350г - 2-3 прийоми ванни 
                                            <br/>500г - 3-5 прийомів ванни 
                                        </p>
               
                                        <p className='recomendacion-content-page-recom-p'><b>Суміш з використанням бомбочок:  </b></p>
                                        <p className='recomendacion-content-page-recom-p'>
                                            <br/>100 г суміші та 1 середнябомбочка - 1 прийом ванни. 
                                            <br/>100 г суміші та 2 маленькі бомбочки - 1 прийом ванни.
                                        </p>
                                   
                                    </div>
                                </div>
                                 )}
                            {content === 'sold' && (<div className='recomendacion-content-page-sold'>
                                    <h2>
                                        Морська сіль
                                    </h2>
                                    <p>Морська сіль - один із способів максимального очищення шкіри та релаксу. 
                                        Сіль можна використовувати як єдину, так і з додаванням бомбочок для ''Вау'' ефекту. 
                                        Не використовувати, якщо є алергічна реакція, попрілості , відкриті рани чи свіже татуювання. 
                                        Розрахунок на 1 прийом ванної: </p>
                                        <div className='recomendacion-content-page-recom'>
                                        <p className='recomendacion-content-page-recom-p'><b>Морська сіль:  </b></p>
                                            <p className='recomendacion-content-page-recom-p'>  
                                                <br/>200г - 1-2 ванни 
                                                <br/>350г - 1-3 ванни 
                                                <br/>500г - 3-5 ванни 
                                            </p>
             
                                            <p className='recomendacion-content-page-recom-p'><b>Морська сіль з додаванням бомбочок:</b></p>  
                                            <p className='recomendacion-content-page-recom-p'>  
                                                <br/>100 г морської солі та 1 середнябомбочка - 1 прийом ванни. 
                                                <br/>100 г морської солі  та 2 маленькі бомбочки - 1 прийом ванни.
                                            </p>
                 
                                        </div>
                                </div>
                                )}


                            </div>
                    </div>
                <Footer/>
            </div>
        </div>
    )

}

export default Recomendacion;