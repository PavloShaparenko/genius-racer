import React, { useState, useEffect, useMemo } from 'react';
import './Race.css';
import carDrive from "../../assets/car-drive.gif";
import carCrash from "../../assets/car-crash.gif";

interface RaceProps {
  carEmoji: string;
  onFinish: (coins: number) => void;
}

interface Question {
  text: string;
  answer: number;
  options: number[];
  obstacleEmoji: string;
}

const generateQuestions = (base: number): Question[] => {
  const obstacles = ['🧟', '🪨', '🌵', '🚧', '🦖'];
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
      text: `${base} × ${multiplier}`,
      answer,
      options: Array.from(fakes).sort(() => Math.random() - 0.5),
      obstacleEmoji: obstacles[Math.floor(Math.random() * obstacles.length)]
    };
  };

  for (let i = 1; i <= 10; i++) questions.push(createQ(i));
  
  for (let i = 0; i < 3; i++) {
    questions.push(createQ(Math.floor(Math.random() * 10) + 1));
  }

  return questions;
};

export default function Race({ carEmoji, onFinish }: RaceProps) {
  const [status, setStatus] = useState<'driving' | 'question' | 'crashed' | 'victory'>('driving');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [carPosition, setCarPosition] = useState({ left: 18, bottom: 16 });
  const [obstacleLeft, setObstacleLeft] = useState(115);
  const [obstacleTarget, setObstacleTarget] = useState(34);
  const [showObstacle, setShowObstacle] = useState(false);

  const questions = useMemo(() => generateQuestions(7), []);
  const currentQ = questions[currentIndex];


  useEffect(() => {
    if (status === 'driving') {
      const driveTime = Math.random() * 500 + 2500;

      const timer = setTimeout(() => {
        console.log('Switch to question');
        setStatus('question');
      }, driveTime);

      return () => clearTimeout(timer);
    }
  }, [status, currentIndex]);


  useEffect(() => {
    if (status !== 'driving') return;

    const interval = window.setInterval(() => {
      setCarPosition(prev => {
        const nextLeft = Math.min(18, prev.left + 1.2);
        
        return { left: nextLeft, bottom: prev.bottom };
      });
    }, 180);

    return () => window.clearInterval(interval);
  }, [status, currentIndex]);

  useEffect(() => {
    if (status === 'question') {
    setCarPosition({
    left:24,
    bottom:15.5
    });
    setShowObstacle(true);
    setObstacleLeft(56);
    requestAnimationFrame(() => {
    setObstacleLeft(54);
  });

}

    if (status === 'driving') {
      setCarPosition({ left:12, bottom: 15.5 });
      setShowObstacle(false);
      setObstacleLeft(110);
      setObstacleTarget(34);
    }
  }, [status, currentIndex]);

  const handleAnswer = (selected: number) => {
    if (selected === currentQ.answer) {
      setEarnedCoins(c => c + 10);
      if (currentIndex + 1 >= questions.length) {
        setStatus('victory');
        setTimeout(() => onFinish(earnedCoins + Math.random() * 20 + 50), 3000);
      } else {
        setCurrentIndex(i => i + 1);
        setStatus('driving');
      }
    } else {
      setStatus('crashed');
      setTimeout(() => onFinish(earnedCoins), 2000); 
    }
  };

  return (
    
    <div className={`race-screen ${status !== 'driving' ? 'paused' : ''}`}>
      
      <div className="sky"></div>
      <div className="mountains"></div>
      <div className="ground"></div>

      <div className="race-ui">
        <div className="score-board">
          💰 {earnedCoins} | Питання: {currentIndex + 1}/13
        </div>
      </div>

      <div
        className={`player-car ${status === 'crashed' ? 'crashed-anim' : ''}`}
        style={{ left: `${carPosition.left}%`, bottom: `${carPosition.bottom}%`, transition: 'left 0.45s ease-out, bottom 0.45s ease-out' }}
      >
        {status === 'crashed' ? (
          <span className="player-car-image crash-emoji"><img src={carCrash} alt="Car" className="player-car-image" draggable="false" /></span>
        ) : (
          <img src={carDrive} alt="Car" className="player-car-image" draggable="false" />
        )}
      </div>

      {showObstacle && status === 'question' && (
        <div
          className="obstacle"
          style={{
            left: `${obstacleLeft}%`,
            bottom: `${carPosition.bottom + 1}%`,
            transition: 'left 2.2s ease-out',
            zIndex: 16,
            transform: `translateX(0)`,
          }}
        >
          {currentQ.obstacleEmoji}
        </div>
      )}

      {status === 'question' && (
        <div className="question-modal">
          <h2>Обережно! Перешкода!</h2>
          <div className="math-problem">{currentQ.text} = ?</div>
          
          <div className="answers-grid">
            {currentQ.options.map((opt, i) => (
              <button 
                key={i} 
                className="answer-btn"
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {status === 'victory' && (
        <div className="victory-message">
          ТИ ПРОЙШОВ РІВЕНЬ! 🎉
        </div>
      )}
    </div>
  );
}