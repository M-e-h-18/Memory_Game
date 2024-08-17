"use client";

import React, { useEffect, useState } from 'react';
import SingleCard from '../components/SingleCard';
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
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const override: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  };

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setGameStarted(true);
  };

  const handleChoice = (card: Card) => {
    if (choiceOne && choiceOne.id === card.id) return;

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
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
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      shuffleCards();
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (gameStarted && cards.every(card => card.matched === true)) {
      setTimeout(() => {
        shuffleCards();
        alert(`Awesome!! You did ${turns} turns. Do you want to give it one more go?`);
      }, 1000);
    }
  }, [cards, gameStarted, turns]);

  return (
    <main className="main">
      {
        loading ?
          <PropagateLoader
            loading={loading}
            size={30}
            cssOverride={override}
          />
          :
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

            <article className="card-grid">
              {cards.map(card => (
                <SingleCard
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={card === choiceOne || card === choiceTwo || card.matched}
                  disabled={disabled}
                />
              ))}
            </article>
          </section>
      }

      <section className="social-media">
        <a href="https://github.com/M-e-h-18" target="_blank" rel="noopener noreferrer">
          <figure className="social-icon">
            <Image src="/images/github.svg" alt="Github" width={60} height={60} />
          </figure>
        </a>
        <a href="https://www.linkedin.com/in/khushi-shrivas-bba781250/" target="_blank" rel="noopener noreferrer">
          <figure className="social-icon">
            <Image src="/images/linkedin.png" alt="LinkedIn" width={60} height={60} />
          </figure>
        </a>
      </section>

      <video className="video-overlay" autoPlay muted loop>
        <source src="/images/retro_bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </main>
  );
}
