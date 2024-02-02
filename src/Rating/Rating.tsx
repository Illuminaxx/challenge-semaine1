import { useState } from 'react';
import './Rating.css';
import starEmpty from '../assets/star.png';
import starHover from '../assets/star_hover.png'
import starFullRed from '../assets/star_selected.png'
import starFull from '../assets/star_full.png'
import starNotSelected from '../assets/star_not_selected.png';
import reset from '../assets/replay.svg';
import resetHover from '../assets/replay_hover.svg';
import { toast } from 'sonner';

const RatingComponent = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [isResetHovered, setIsResetHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedback, setFeedback] = useState('');


    const getStarImage = (index: number) => {
        if (rating >= index) {
            return starFullRed; // Étoile sélectionnée
        } else if (rating > 0 && index > rating) {
            return starNotSelected; // Étoile non sélectionnée après une étoile sélectionnée
        } else if (hover === index) {
            return starHover; // Étoile survolée
        } else if (hover > index) {
            return starFull;
        }
        return starEmpty; // Étoile non sélectionnée et non survolée
    };

    const handleRating = (newRating) => {
        setRating(newRating);
        if (newRating > 0) {
            setIsModalOpen(true); // Ouvrir la modale seulement si une note est donnée
        }
    };

    const resetRating = () => {
        setRating(0);
        setHover(0);
        setIsModalOpen(false); // Fermer la modale si elle est ouverte
    };

    const handleSubmit = () => {
        toast.success("Feedback sent: " + feedback);
        setFeedback('');
        setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="rating-wrapper">
            <div className="background-blur"></div>
            <div className="rating-container">
                <div className="rating-header">
                    <h3>How many stars would you give to them?</h3>
                    <p className="rating-subtitle">Jonah Noah delivered your order from
                        <span className='rating-subtitle-span'> Nanica Homemade Pies</span>, today at 19:47 (7 min ahead schedule).
                    </p>
                </div>
                <div className="stars">
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <button
                                type="button"
                                key={ratingValue}
                                className="star"
                                onClick={() => handleRating(ratingValue)}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(rating)}
                            >
                                <img
                                    src={getStarImage(ratingValue)}
                                    alt={`star ${ratingValue}`}
                                />
                            </button>
                        );
                    })}
                </div>
                <button
                    className="reset-button"
                    onClick={resetRating}
                    onMouseEnter={() => setIsResetHovered(true)}
                    onMouseLeave={() => setIsResetHovered(false)}
                >
                    <img src={isResetHovered ? resetHover : reset} alt="Reset" />
                </button>
            </div>

            {/* Modale */}
            {isModalOpen && (
                <div className="modal">
                    <h3>Feedback</h3>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Send</button>
                    <button onClick={closeModal}>Close</button>
                </div>
            )}
        </div>
    );
};

export default RatingComponent;
