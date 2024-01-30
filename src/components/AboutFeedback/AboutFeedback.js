import React, { useState, useEffect } from "react";
import './AboutFeedback.css';
import { lendingData } from '../../assets/api/api';

const AboutFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await lendingData.getFeedback();
                setFeedbacks(response.data.feedbackList);
            } catch (error) {
                console.error('Помилка при отриманні відгуків:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            // Оновлюємо індекс відгуку, переходячи до наступного
            setCurrentFeedbackIndex((prevIndex) =>
                prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
            );
        }, 15000); // 15 секунд

        return () => clearInterval(interval); // Зупиняємо інтервал при розмонтуванні компонента

    }, [currentFeedbackIndex, feedbacks.length]);

    const handleArrowClick = (direction) => {
        // Оновлюємо індекс відгуку відповідно до напрямку
        if (direction === 'left') {
            setCurrentFeedbackIndex(currentFeedbackIndex === 0 ? feedbacks.length - 1 : currentFeedbackIndex - 1);
        } else if (direction === 'right') {
            setCurrentFeedbackIndex(currentFeedbackIndex === feedbacks.length - 1 ? 0 : currentFeedbackIndex + 1);
        }
    };

    return (
        <div className="about-feedback">
            <div className='content-padding'>
                <div className="about-feedback-content">
                    <div className="about-feedback-text">
                        <h2>Відгуки наших клієнтів</h2>
                        <p>Ваші відгуки завжди нас радують</p>
                    </div>
                    {feedbacks.length > 1 && (
                        <div className="about-feedback-clin">
                            <a className="left-arrow" onClick={() => handleArrowClick('left')}></a>
                            <div className="about-feedback-clinent">
                                {feedbacks.length > 0 ? (
                                    <>
                                        <h3>{feedbacks[currentFeedbackIndex].fullName}</h3>
                                        <p>{feedbacks[currentFeedbackIndex].feedback}</p>
                                    </>
                                ) : (
                                    <p>Немає доступних відгуків</p>
                                )}
                            </div>
                            <a className="right-arrow" onClick={() => handleArrowClick('right')}></a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AboutFeedback;
