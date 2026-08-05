import React, { useState, useEffect, useMemo, useRef } from 'react';
import './race.css';
import { useLanguage } from '../../i18n/LanguageContext'; // <--- ІМПОРТ

import holeImg from "../../assets/hole.png";
import snakeImg from "../../assets/snake.png";
import gangsterImg from "../../assets/gangster.png";
import zombieImg from "../../assets/zombie.png";
import stoneImg from "../../assets/stone.png";

import engineSfx from "../../assets/sounds/engine.mp3";
import warningSfx from "../../assets/sounds/warning.mp3";
import correctSfx from "../../assets/sounds/correct.mp3";
import coinSfx from "../../assets/sounds/coin.mp3";
import crashSfx from "../../assets/sounds/crash.mp3";
import sadSfx from "../../assets/sounds/sad.mp3";
import victorySfx from "../../assets/sounds/victory.mp3";
import clickSfx from "../../assets/sounds/click.mp3";

const playSound = (src: string, volume = 1) => {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.play().catch(() => {});
};

interface RaceProps {
  carImage: string;
  carCrashImage: string;
  level: number;
  bgImage: string;
  bgMusic: string;
  onFinish: (coins: number, isVictory: boolean) => void;
}

interface Question {
  text: string; answer: number; options: number[]; obstacleImg: string;
}

const generateQuestions = (base: number): Question[] => {
  const obstacles = [holeImg, snakeImg, gangsterImg, zombieImg, stoneImg];
  const questions: Question[] = [];

  const createQ = (multiplier: number) => {
    const answer = base * multiplier;
    const fakes = new Set([answer]);
    while (fakes.size < 4) {
      const fakeMult = multiplier + (Math.floor(Math.random() * 5) - 2);
      const fakeAns = base * (fakeMult > 0 ? fakeMult : 1) + (Math.floor(Math.random() * 3));
      if (fakeAns !== answer && fakeAns > 0) fakes.add(fakeAns);
    }
    return {
      text: `${base} × ${multiplier}`, answer, options: Array.from(fakes).sort(() => Math.random() - 0.5),
      obstacleImg: obstacles[Math.floor(Math.random() * obstacles.length)]
    };
  };

  for (let i = 1; i <= 10; i++) questions.push(createQ(i));
  for (let i = 0; i < 3; i++) questions.push(createQ(Math.floor(Math.random() * 10) + 1));
  return questions;
};

export default function Race({ carImage, carCrashImage, level, bgImage, bgMusic, onFinish }: RaceProps) {
  const { t } = useLanguage(); // <--- СЛОВНИК

  const [status, setStatus] = useState<'driving' | 'question' | 'crashed' | 'victory'>('driving');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [carPosition, setCarPosition] = useState({ left: 18, bottom: 22 });
  const [obstacleLeft, setObstacleLeft] = useState(115);
  const [obstacleTarget, setObstacleTarget] = useState(34);
  const [showObstacle, setShowObstacle] = useState(false);

  const questions = useMemo(() => generateQuestions(level), [level]);
  const currentQ = questions[currentIndex];

  const engineAudioRef = useRef(new Audio(engineSfx));
  const backgroundMusicRef = useRef(new Audio(bgMusic));

  useEffect(() => {
    const engine = engineAudioRef.current;
    const backgroundMusic = backgroundMusicRef.current;
    engine.loop = true; engine.volume = 0.5;
    backgroundMusic.loop = true; backgroundMusic.volume = 0.65;

    if (status === 'driving' || status === 'question' || status === 'victory') {
      engine.play().catch(() => {}); backgroundMusic.play().catch(() => {});
    } else {
      engine.pause(); backgroundMusic.pause();
    }
    return () => { engine.pause(); backgroundMusic.pause(); };
  }, [status]);

  useEffect(() => {
    if (status === 'driving') {
      const driveTime = Math.random() * 700 + 1600;
      const timer = setTimeout(() => setStatus('question'), driveTime);
      return () => clearTimeout(timer);
    }
  }, [status, currentIndex]);

  useEffect(() => {
    if (status !== 'driving') return;
    const interval = window.setInterval(() => {
      setCarPosition(prev => ({ left: Math.min(18, prev.left + 1.2), bottom: prev.bottom }));
    }, 180);
    return () => window.clearInterval(interval);
  }, [status, currentIndex]);

  useEffect(() => {
    if (status === 'question') {
      playSound(warningSfx, 0.25);
      setCarPosition({ left: 14, bottom: 18 }); setShowObstacle(true); setObstacleLeft(56);
      requestAnimationFrame(() => setObstacleLeft(54));
    }
    if (status === 'driving') {
      setCarPosition({ left: 12, bottom: 18 }); setShowObstacle(false); setObstacleLeft(110); setObstacleTarget(34);
    }
  }, [status, currentIndex]);

  const handleAnswer = (selected: number) => {
    playSound(clickSfx);
    if (selected === currentQ.answer) {
      playSound(correctSfx); setTimeout(() => playSound(coinSfx), 200);
      setEarnedCoins(c => c + 10);
      if (currentIndex + 1 >= questions.length) {
        setStatus('victory'); playSound(victorySfx);
        setTimeout(() => onFinish(earnedCoins + Math.random() * 20 + 50, true), 3000);
      } else {
        setCurrentIndex(i => i + 1); setStatus('driving');
      }
    } else {
      setStatus('crashed'); playSound(crashSfx); setTimeout(() => playSound(sadSfx), 800);
      setTimeout(() => onFinish(earnedCoins, false), 2500); 
    }
  };

  return (
    <div className={`race-screen ${status !== 'driving' ? 'paused' : ''}`}>
      <div className="bg-wrapper">
        <img src={bgImage} className="bg-img" alt="background" draggable="false" />
        <img src={bgImage} className="bg-img" alt="background" draggable="false" />
      </div>

      <div className="race-ui">
        <div className="score-board">
          💰 {earnedCoins} | {t.level}: ×{level} | {t.question}: {currentIndex + 1}/13
        </div>
      </div>

      <div className={`player-car ${status === 'crashed' ? 'crashed-anim' : ''}`} style={{ left: `${carPosition.left}%`, bottom: `${carPosition.bottom}%`, transition: 'left 0.45s ease-out, bottom 0.45s ease-out' }}>
        {status === 'crashed' ? (
          <span className="player-car-image crash-emoji"><img src={carCrashImage} alt="Car" className="player-car-image" draggable="false" /></span>
        ) : (
          <img src={carImage} alt="Car" className="player-car-image" draggable="false" />
        )}
      </div>

      {showObstacle && status === 'question' && (
        <div className="obstacle" style={{ left: `${obstacleLeft}%`, bottom: `${carPosition.bottom + 1}%`, transition: 'left 2.2s ease-out', zIndex: 16, transform: `translateX(0)` }}>
          <img src={currentQ.obstacleImg} alt="obstacle" className="obstacle-img" draggable="false" />
        </div>
      )}

      {status === 'question' && (
        <div className="question-modal">
          <h2>{t.obstacle}</h2>
          <div className="math-problem">{currentQ.text} = ?</div>
          <div className="answers-grid">
            {currentQ.options.map((opt, i) => (
              <button key={i} className="answer-btn" onClick={() => handleAnswer(opt)}>{opt}</button>
            ))}
          </div>
        </div>
      )}

      {status === 'victory' && (
        <div className="victory-message">{t.victory}</div>
      )}
    </div>
  );
}