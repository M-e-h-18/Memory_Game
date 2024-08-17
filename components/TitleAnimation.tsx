
import { useEffect, useRef } from 'react';
import styles from './TitleAnimation.module.css';

const TitleAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const letters = container?.querySelectorAll('.letter');

    if (letters) {
      letters.forEach((letter, index) => {
        // Set random positions for the letters
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const delay = index * 100; 
        letter.style.transform = `translate(${randomX}vw, ${randomY}vh)`;
        letter.style.opacity = '1'; 
        letter.style.transition = `transform 2s ease-in-out ${delay}ms, opacity 2s ease-in-out ${delay}ms`; // Animation with delay
      });

      
      setTimeout(() => {
        container?.classList.add(styles.gathered);
      }, 100); 
    }
  }, []);

  return (
    <div className={styles.titleContainer} ref={containerRef}>
      {['M', 'E', 'M', 'O', 'R', 'Y', 'G', 'A', 'M', 'E'].map((char, index) => (
        <span key={index} className={`${styles.letter} letter`}>
          {char}
        </span>
      ))}
    </div>
  );
};

export default TitleAnimation;
