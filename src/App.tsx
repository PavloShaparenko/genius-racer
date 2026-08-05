import { useState, useEffect } from 'react';
import './index.css';
import Race from './screens/Race/race';
import Explanation from './screens/Explanation/Explanation';
import Garage, { CarDef } from './screens/Garage/Garage'; 

import carBasicImg from "./assets/car-drive.gif"; 
import carSportImg from "./assets/car-sport.gif"; 
import carTankImg from "./assets/car-tank.gif";

import carBasicCrash from "./assets/car-basic-crash.gif"; 
import carSportCrash from "./assets/car-sport-crash.gif"; 
import carTankCrash from "./assets/car-tank-crash.gif";

import bglevel1 from "./assets/bg-level-1.png";
import bglevel2 from "./assets/bg-level-2.png";
import bglevel3 from "./assets/bg-level-3.png";
import bglevel4 from "./assets/bg-level-4.png";
import bglevel5 from "./assets/bg-level-5.png";
import bglevel6 from "./assets/bg-level-6.png";
import bglevel7 from "./assets/bg-level-7.png";
import bglevel8 from "./assets/bg-level-8.png";
import bglevel9 from "./assets/bg-level-9.png";

import musicLevel1 from "./assets/sounds/music-level-1.mp3";
import musicLevel2 from "./assets/sounds/music-level-2.mp3";
import musicLevel3 from "./assets/sounds/music-level-3.mp3";
import musicLevel4 from "./assets/sounds/music-level-4.mp3";
import musicLevel5 from "./assets/sounds/music-level-5.mp3";
import musicLevel6 from "./assets/sounds/music-level-6.mp3";
import musicLevel7 from "./assets/sounds/music-level-7.mp3";
import musicLevel8 from "./assets/sounds/music-level-8.mp3";
import musicLevel9 from "./assets/sounds/music-level-9.mp3";

import { useLanguage } from './i18n/LanguageContext';

const LEVEL_BACKGROUNDS: Record<number, string> = { 1: bglevel1, 2: bglevel2, 3: bglevel3, 4: bglevel4, 5: bglevel5, 6: bglevel6, 7: bglevel7, 8: bglevel8, 9: bglevel9 };
const LEVEL_MUSIC: Record<number, string> = { 1: musicLevel1, 2: musicLevel2, 3: musicLevel3, 4: musicLevel4, 5: musicLevel5, 6: musicLevel6, 7: musicLevel7, 8: musicLevel8, 9: musicLevel9 };

type Screen = 'lobby' | 'garage' | 'race' | 'explanation';

export default function App() {
  const { t, lang, setLang } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState<Screen>('lobby');
  const [selectedLevel, setSelectedLevel] = useState(1);
  const levelOptions = Array.from({ length: 9 }, (_, index) => index + 1);

  const CARS_DB: CarDef[] = [
    { id: 'basic', name: t.carBasicName, price: 0, image: carBasicImg, crashImage: carBasicCrash },
    { id: 'sport', name: t.carSportName, price: 150, image: carSportImg, crashImage: carSportCrash },
    { id: 'tank', name: t.carTankName, price: 500, image: carTankImg, crashImage: carTankCrash },
  ];

  const [coins, setCoins] = useState(() => Number(localStorage.getItem('tima_coins')) || 0);
  const [unlockedCars, setUnlockedCars] = useState<string[]>(() => {
    const saved = localStorage.getItem('tima_cars');
    return saved ? JSON.parse(saved) : ['basic'];
  });
  const [selectedCarId, setSelectedCarId] = useState(() => localStorage.getItem('tima_selected_car') || 'basic');
  const [completedLevels, setCompletedLevels] = useState<number[]>(() => {
    const saved = localStorage.getItem('completed_levels');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tima_coins', coins.toString());
    localStorage.setItem('tima_cars', JSON.stringify(unlockedCars));
    localStorage.setItem('tima_selected_car', selectedCarId);
    localStorage.setItem('completed_levels', JSON.stringify(completedLevels));
  }, [coins, unlockedCars, selectedCarId, completedLevels]);

  const handleBuyCar = (id: string, price: number) => {
    setCoins(prev => prev - price);
    setUnlockedCars(prev => [...prev, id]);
    setSelectedCarId(id);
  };

  const currentCar = CARS_DB.find(c => c.id === selectedCarId) || CARS_DB[0];
  const currentCarImage = currentCar.image;

  return (
    <div className="game-container">
      {currentScreen === 'lobby' && (
        <div style={{ padding: 20, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', gap: '10px' }}>
            <button onClick={() => setLang('uk')} style={{ opacity: lang === 'uk' ? 1 : 0.4, fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }}>🇺🇦</button>
            <button onClick={() => setLang('en')} style={{ opacity: lang === 'en' ? 1 : 0.4, fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }}>🇬🇧</button>
            <button onClick={() => setLang('pl')} style={{ opacity: lang === 'pl' ? 1 : 0.4, fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }}>🇵🇱</button>
          </div>

          <h1>{t.menuTitle}</h1>
          <h2 style={{ color: '#ffd700', margin: '20px 0' }}>💰 {coins}</h2>

          <img src={currentCarImage} alt="Current Car" style={{ width: '120px', margin: '0 auto 20px', transform: 'scaleX(-1)' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, maxWidth: 320, margin: '0 auto 20px' }}>
            {levelOptions.map((level) => {
              const isCompleted = completedLevels.includes(level);
              const isUnlocked = level === 1 || completedLevels.includes(level - 1);
              const isSelected = selectedLevel === level;

              let bgColor = '#2196F3';
              if (!isUnlocked) bgColor = '#555555';
              else if (isSelected) bgColor = '#ffd700';
              else if (isCompleted) bgColor = '#4CAF50';

              return (
                <button
                  key={level}
                  onClick={() => { if (isUnlocked) setSelectedLevel(level); }}
                  style={{
                    padding: '12px', fontSize: '18px', fontWeight: 'bold', background: bgColor,
                    color: isSelected ? '#000' : 'white', border: 'none', borderRadius: 10,
                    cursor: isUnlocked ? 'pointer' : 'not-allowed', opacity: isUnlocked ? 1 : 0.5
                  }}
                >
                  {isUnlocked ? `×${level}` : '🔒'}
                </button>
              );
            })}
          </div>

          <p style={{ marginBottom: 16, fontSize: '18px' }}>
            {t.selectedTable} {selectedLevel}
          </p>

          <button
            onClick={() => setCurrentScreen('explanation')}
            style={{ padding: '15px', fontSize: '18px', background: '#FF9800', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', marginBottom: 12 }}
          >
            {t.explanationBtn}
          </button>

          <button
            onClick={() => setCurrentScreen('race')}
            style={{ padding: '20px', fontSize: '24px', fontWeight: 'bold', background: '#4CAF50', color: 'white', border: 'none', borderRadius: 15, cursor: 'pointer', marginBottom: 20, boxShadow: '0 6px 0 #2E7D32' }}
          >
            {t.playBtn}
          </button>

          <button
            onClick={() => setCurrentScreen('garage')}
            style={{ padding: '15px', fontSize: '18px', background: '#2196F3', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer' }}
          >
            {t.garageBtn}
          </button>
        </div>
      )}

      {currentScreen === 'garage' && (
        <Garage 
          cars={CARS_DB} coins={coins} unlockedCars={unlockedCars} selectedCarId={selectedCarId}
          onSelectCar={setSelectedCarId} onBuyCar={handleBuyCar} onBack={() => setCurrentScreen('lobby')}
        />
      )}

      {currentScreen === 'explanation' && (
        <Explanation onBack={() => setCurrentScreen('lobby')} onPlay={() => setCurrentScreen('race')} />
      )}

      {currentScreen === 'race' && (
        <Race
          level={selectedLevel}
          carCrashImage={currentCar.crashImage}
          carImage={currentCarImage}
          bgImage={LEVEL_BACKGROUNDS[selectedLevel] || bglevel1}
          bgMusic={LEVEL_MUSIC[selectedLevel] || musicLevel1}
          onFinish={(earnedCoins, isVictory) => {
            setCoins((c) => c + earnedCoins);
            if (isVictory && !completedLevels.includes(selectedLevel)) {
              setCompletedLevels(prev => [...prev, selectedLevel]);
            }
            setCurrentScreen('lobby');
          }}
        />
      )}
    </div>
  );
}