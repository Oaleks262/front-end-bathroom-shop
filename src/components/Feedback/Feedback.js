import { useState } from 'react';
import React  from 'react';
import './Feedback.css';
import FeedbackPopup from '../Popup/FeedbackPopUp';



const Feedback = () =>{


    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    }

    return(
        <div className='feedback-land'>
            <div className='content-padding'>
            <div className='feedback-content'>
                <div className='feedback-content-text'>
                    <h2>
                        Бажаєте залишити свій відгук?
                    </h2>
                    <p>
                        Ми раді бачити відгук кожного нашого клієнта
                    </p>
                    <a className='feedback-content-button' onClick={togglePopup}></a>
                </div>

            </div>
            </div>
            {isPopupOpen && <FeedbackPopup togglePopup={togglePopup} />}
        </div>
    )
}

export default Feedback;