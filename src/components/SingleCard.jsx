import "./SingleCard.style.scss";

import cardBack from "../assets/images/back.png";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const hancleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.img} alt="card-front" />
        <img
          className="back"
          src={cardBack}
          onClick={hancleClick}
          alt="card back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
