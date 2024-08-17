import React from "react";
import "./SingleCard.css";

export interface Card {
    src: string;
    id?: number;
    matched: boolean;
}

interface Props {
    card: Card;
    handleChoice: (card: Card) => void;
    flipped: boolean;
    disabled: boolean;
}

const SingleCard: React.FC<Props> = ({ card, handleChoice, flipped, disabled }) => {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    };

    return (
        <div className="card" key={card.id}>
            <figure className={flipped ? "flipped" : ""}>
                <img className="frontCard" src={card.src} alt="Front Card" />
                <img
                    className="backCard"
                    src="./images/cover.png"
                    onClick={handleClick}
                    alt="Cover - Back Card"
                />
            </figure>
        </div>
    );
};

export default SingleCard;