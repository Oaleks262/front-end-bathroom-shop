import React, { useState, useEffect } from "react";
import './AboutFeedback.css';
import { lendingData } from '../../assets/api/api';

const AboutFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
    const [fade, setFade] = useState(true);

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
        if (feedbacks.length > 1) {
            const interval = setInterval(() => {
                setFade(false);
                setTimeout(() => {
                    setCurrentFeedbackIndex((prevIndex) =>
                        prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
                    );
                    setFade(true);
                }, 500);
            }, 15000);

            return () => clearInterval(interval);
        }
    }, [currentFeedbackIndex, feedbacks.length]);

    const handleArrowClick = (direction) => {
        if (feedbacks.length > 1) {
            setFade(false);
            setTimeout(() => {
                setCurrentFeedbackIndex((prevIndex) =>
                    direction === 'left' ? (prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1) : (prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1)
                );
                setFade(true);
            }, 500);
        }
    };

    return (
        <div className="about-feedback" id="about-feedback">
            <div className='content-padding'>
                <div className="about-feedback-content">
                    <div className="about-feedback-text">
                        <h2>Відгуки наших клієнтів</h2>
                        <p>Ваші відгуки завжди нас радують</p>
                    </div>
                    {feedbacks.length > 0 && (
                        <div className="about-feedback-clin">
                            {feedbacks.length > 1 && (
                                <>
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
                                </>
                            )}
                            {feedbacks.length === 1 && (
                                <div className="about-feedback-clinent">
                                    <h3>{feedbacks[0].fullName}</h3>
                                    <p>{feedbacks[0].feedback}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AboutFeedback;
