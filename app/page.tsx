"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SingleCard from '../components/SingleCard';
import StartPopup from '../components/StartPopup';
import DifficultyPopup from '../components/DifficultyPopup';
import PropagateLoader from "react-spinners/PropagateLoader";
import Image from 'next/image';

interface Card {
  src: string;
  id?: number;
  matched: boolean;
}

const cardImages: Card[] = [
  { src: "/images/boss_baby.png", matched: false },
  { src: "/images/croods.png", matched: false },
  { src: "/images/king_gristle.png", matched: false },
  { src: "/images/pig.jpg", matched: false },
  { src: "/images/gidget.png", matched: false },
  { src: "/images/wall-E.jpg", matched: false },
];

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [choiceThree, setChoiceThree] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [showDifficultyPopup, setShowDifficultyPopup] = useState<boolean>(false);

  const override: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  };

  const shuffleCards = (mode: string) => {
    let shuffledCards;
    if (mode === 'easy') {
      shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card, index) => ({ ...card, id: index }));
    } else {
      shuffledCards = [...cardImages, ...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card, index) => ({ ...card, id: index }));
    }

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setChoiceThree(null);
    setTurns(0);
    setGameStarted(true);
    setDifficulty(mode);
  };

  const handleChoice = (card: Card) => {
    if (choiceOne && choiceOne.id === card.id) return;

    if (!choiceOne) {
      setChoiceOne(card);
    } else if (!choiceTwo) {
      setChoiceTwo(card);
    } else if (!choiceThree) {
      setChoiceThree(card);
    }
  };

  useEffect(() => {
    if (difficulty === 'easy') {
      if (choiceOne && choiceTwo) {
        setDisabled(true);
        if (choiceOne.src === choiceTwo.src) {
          setCards(prevCards => {
            return prevCards.map(card => {
              if (card.src === choiceOne.src) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            });
          });
          resetTurn();
        } else {
          setTimeout(() => resetTurn(), 1000);
        }
      }
    } else if (difficulty === 'hard') {
      if (choiceOne && choiceTwo && choiceThree) {
        setDisabled(true);
        if (choiceOne.src === choiceTwo.src && choiceOne.src === choiceThree.src) {
          setCards(prevCards => {
            return prevCards.map(card => {
              if (card.src === choiceOne.src) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            });
          });
          resetTurn();
        } else {
          setTimeout(() => resetTurn(), 1000);
        }
      } else if (choiceOne && choiceTwo && choiceOne.src !== choiceTwo.src) {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo, choiceThree, difficulty]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setChoiceThree(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPopup(true);
    }, 1500);
  }, []);

  useEffect(() => {
    if (gameStarted && cards.every(card => card.matched === true)) {
      setTimeout(() => {
        shuffleCards(difficulty!);
        alert(`Awesome!! You did ${turns} turns. Do you want to give it one more go?`);
      }, 1000);
    }
  }, [cards, gameStarted, turns, difficulty]);

  const startGame = () => {
    setShowPopup(false);
    setShowDifficultyPopup(true);
  };

  const selectDifficulty = (mode: string) => {
    setShowDifficultyPopup(false);
    shuffleCards(mode);
  };

  const goBackToHome = () => {
    router.push('/'); // Navigate to the home page
  };

  const resetGame = () => {
    setShowPopup(true);
    setGameStarted(false);
    setDifficulty(null);
    setCards([]);
    setTurns(0);
  };

  return (
    <main className="main">
      {loading ?
        <PropagateLoader
          loading={loading}
          size={30}
          cssOverride={override}
        />
        :
        <>
          {showPopup && (
            <StartPopup 
              onStart={startGame} 
              onBackToHome={goBackToHome} 
              showBackButton={gameStarted} // Show the button only if the game has started
            />
          )}
          {showDifficultyPopup && <DifficultyPopup onSelectDifficulty={selectDifficulty} />}
          
          {difficulty === 'easy' && (
            <video className="video-overlay-easy" autoPlay muted loop>
              <source src="/images/retro_bg.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {difficulty === 'hard' && (
            <video className="video-overlay-hard" autoPlay muted loop>
              <source src="/images/retro_bg.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          <section className='container'>
            <article>
              <button className='title'>M</button>
              <button className='title'>E</button>
              <button className='title'>M</button>
              <button className='title'>O</button>
              <button className='title'>R</button>
              <button className='title'>Y&nbsp;&nbsp;</button>
              <button className='title'>G</button>
              <button className='title'>A</button>
              <button className='title'>M</button>
              <button className='title'>E</button>
            </article>

            <article className="card-grid" style={{ gridTemplateColumns: difficulty === 'hard' ? 'repeat(6, 1fr)' : 'repeat(4, 1fr)' }}>
              {cards.map(card => (
                <SingleCard
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={card === choiceOne || card === choiceTwo || card === choiceThree || card.matched}
                  disabled={disabled}
                />
              ))}
            </article>
          </section>

          {gameStarted && (
            
           
            <button className="reset-button" onClick={resetGame} aria-label="Change the difficulty">
              
              
            <div className="tooltip-container">
              <Image src="/images/reset_icon.png" alt="Reset" width={60} height={60} />
              <span className="tooltip-text">Change the difficulty</span>
            </div>
          </button>
          
          )}
        </>
      }

      <section className="social-media">
        <a href="https://github.com/M-e-h-18" target="_blank" rel="noopener noreferrer">
          <Image src="/images/github.svg" alt="GitHub" width={50} height={50} />
        </a>
        <a href="https://www.linkedin.com/in/khushi-shrivas-bba781250/" target="_blank" rel="noopener noreferrer">
          <Image src="/images/linkedin.png" alt="LinkedIn" width={50} height={50} />
        </a>
      </section>
    </main>
  );
}
