import "./SectionFour.style.scss";

import CARD_IMAGES from "../assets/data/CARD_IMAGES";
import SingleCard from "../components/SingleCard";
import Scoreboard from "./Scoreboard";

import { useUpdateScore } from "../hooks/useUpdateScore";

import { useEffect, useState } from "react";

// THIS CODE IS INSPIRED BY SHAUN PELLING (THE NET NINJA) UDEMY COURSE
const SectionFour = ({ userDisplayName }) => {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const { updateScore } = useUpdateScore();

  useEffect(() => {
    if (userDisplayName) {
      updateScore(score, userDisplayName);
      console.log(userDisplayName);
    }
  }, [score, userDisplayName, updateScore]);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...CARD_IMAGES, ...CARD_IMAGES] //multiply each card
      .sort(() => Math.random() - 0.5) // sort cards in random order
      .map((card) => ({ ...card, id: Math.random() })); // adding unique id

    setCards(shuffledCards);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.img === choiceTwo.img) {
        setScore((prevScore) => prevScore + 10);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.img === choiceOne.img) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          setScore((prevScore) => prevScore - 2);
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="container s4">
      <button onClick={shuffleCards}>Play game</button>
      <p>Score: {score}</p>
      <Scoreboard score={score} />
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionFour;
