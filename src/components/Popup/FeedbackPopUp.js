import React, { useState } from 'react';
import './FeedbackPopUp.css';
import { lendingData } from '../../assets/api/api';

const FeedbackPopup = ({ togglePopup }) => {
    const [feedback, setFeedback] = useState({ fullName: '', feedback: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFeedback({ ...feedback, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await lendingData.postFeedback(feedback); // Відправляємо введений відгук через функцію postFeedback зі складу lendingData
            alert('Відгук успішно надіслано!');
            togglePopup();
        } catch (error) {
            console.error('Помилка при відправці відгуку:', error);
            alert('Сталася помилка при відправці відгуку. Будь ласка, спробуйте ще раз.');
        }
    };

    return (
        <div className="feedback-popup">
            <div className="feedback-popup-content">
                <div className='feedback-popup-close'>
                <a className="close-button" onClick={togglePopup}>×</a>
                </div>
                <div className='feedback-popup-content-div'>
                <h2>Залиште свій відгук</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className='feedback-popup-input'
                        type="text"
                        name="fullName"
                        placeholder="Ім'я"
                        value={feedback.fullName}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        className='feedback-popup-textatea'
                        
                        name="feedback"
                        placeholder="Коментар"
                        value={feedback.feedback}
                        onChange={handleInputChange}
                        required
                    />
                    <button className='feedback-form-button' type="submit"></button>
                </form>
            </div>
            </div>
        </div>
    );
};

export default FeedbackPopup;
