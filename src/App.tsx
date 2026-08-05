import React, { useState, useEffect } from 'react';
import './index.css';
import Race from './screens/Race/race';
import Explanation from './screens/Explanation/Explanation';
import Garage, { CarDef } from './screens/Garage/Garage'; // Перевір, чи правильний шлях до файлу Garage.tsx

// Імпорт картинок машин
import carBasicImg from "./assets/car-drive.gif"; 
import carSportImg from "./assets/car-sport.gif"; 
import carTankImg from "./assets/car-tank.gif";


// ИМПОРТ ГИФОК АВАРИЙ (Укажи свои правильные названия файлов!)
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

const LEVEL_BACKGROUNDS: Record<number, string> = {
  1: bglevel1,
  2: bglevel2,
  3: bglevel3,
  4: bglevel4,
  5: bglevel5,
  6: bglevel6,
  7: bglevel7,
  8: bglevel8,
  9: bglevel9,
};

const LEVEL_MUSIC: Record<number, string> = {
  1: musicLevel1,
  2: musicLevel2,
  3: musicLevel1,
  4: musicLevel2,
  5: musicLevel3,
  6: musicLevel4,
  7: musicLevel5,
  8: musicLevel6,
  9: musicLevel7,
};

const CARS_DB: CarDef[] = [
  { id: 'basic', name: 'Базова', price: 0, image: carBasicImg, crashImage: carBasicCrash },
  { id: 'sport', name: 'Спортивна', price: 150, image: carSportImg, crashImage: carSportCrash },
  { id: 'tank', name: 'Танк', price: 500, image: carTankImg, crashImage: carTankCrash },
];

type Screen = 'lobby' | 'garage' | 'race' | 'explanation';

export default function App() {
  
  const { t, lang, setLang } = useLanguage();


  const [currentScreen, setCurrentScreen] = useState<Screen>('lobby');
  
  // Вибір рівня
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const levelOptions = Array.from({ length: 9 }, (_, index) => index + 1);

  // ==========================================
  // ДАНІ ГРАВЦЯ (Зчитуємо з localStorage)
  // ==========================================
  const [coins, setCoins] = useState<number>(() => {
    return Number(localStorage.getItem('tima_coins')) || 0;
  });

  const [unlockedCars, setUnlockedCars] = useState<string[]>(() => {
    const saved = localStorage.getItem('tima_cars');
    return saved ? JSON.parse(saved) : ['basic'];
  });

  const [selectedCarId, setSelectedCarId] = useState<string>(() => {
    return localStorage.getItem('tima_selected_car') || 'basic';
  });

  const [completedLevels, setCompletedLevels] = useState<number[]>(() => {
    const saved = localStorage.getItem('completed_levels');
    return saved ? JSON.parse(saved) : [];
  });

  // ==========================================
  // ЗБЕРЕЖЕННЯ (Коли дані змінюються, пишемо в localStorage)
  // ==========================================
  useEffect(() => {
    localStorage.setItem('tima_coins', coins.toString());
    localStorage.setItem('tima_cars', JSON.stringify(unlockedCars));
    localStorage.setItem('tima_selected_car', selectedCarId);
    localStorage.setItem('completed_levels', JSON.stringify(completedLevels));
  }, [coins, unlockedCars, selectedCarId, completedLevels]);

  

  // ==========================================
  // ЛОГІКА ГАРАЖА
  // ==========================================
  const handleBuyCar = (id: string, price: number) => {
    setCoins(prev => prev - price);
    setUnlockedCars(prev => [...prev, id]);
    setSelectedCarId(id); // Одразу сідаємо в куплену машину
  };

  // Знаходимо поточну машину та картинку для відображення в меню та гонці
  const currentCar = CARS_DB.find(c => c.id === selectedCarId) || CARS_DB[0];
  const currentCarImage = currentCar.image;

  return (
    <div className="game-container">
      
      {/* ГОЛОВНЕ МЕНЮ */}
      {currentScreen === 'lobby' && (
        <div style={{ padding: 20, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1>Головне меню</h1>
          <h2 style={{ color: '#ffd700', margin: '20px 0' }}>💰 {coins}</h2>

          {/* Показуємо поточну машину в меню */}
          <img src={currentCarImage} alt="Current Car" style={{ width: '120px', margin: '0 auto 20px', transform: 'scaleX(-1)' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, maxWidth: 320, margin: '0 auto 20px' }}>
            {levelOptions.map((level) => {
              // 1. Вычисляем статусы
              const isCompleted = completedLevels.includes(level);
              const isUnlocked = level === 1 || completedLevels.includes(level - 1);
              const isSelected = selectedLevel === level;

              // 2. Определяем цвет фона
              let bgColor = '#2196F3'; // Синий по умолчанию (доступен, но не пройден)
              if (!isUnlocked) bgColor = '#555555'; // Серый (заблокирован)
              else if (isSelected) bgColor = '#ffd700'; // Желтый (выбран прямо сейчас)
              else if (isCompleted) bgColor = '#4CAF50'; // Зеленый (уже пройден)

              return (
                <button
                  key={level}
                  onClick={() => {
                    // Разрешаем кликать только если уровень разблокирован
                    if (isUnlocked) {
                      setSelectedLevel(level);
                    }
                  }}
                  style={{
                    padding: '12px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    background: bgColor,
                    color: isSelected ? '#000' : 'white',
                    border: 'none',
                    borderRadius: 10,
                    cursor: isUnlocked ? 'pointer' : 'not-allowed', // Меняем курсор для заблокированных
                    opacity: isUnlocked ? 1 : 0.5 // Делаем заблокированные полупрозрачными
                  }}
                >
                  {/* Если заблокирован, показываем замочек, иначе номер */}
                  {isUnlocked ? `×${level}` : '🔒'}
                </button>
              );
            })}
          </div>

          <p style={{ marginBottom: 16, fontSize: '18px' }}>
            Обрано: таблиця множення на {selectedLevel}
          </p>

          <button
            onClick={() => setCurrentScreen('explanation')}
            style={{ padding: '15px', fontSize: '18px', background: '#FF9800', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', marginBottom: 12 }}
          >
            📘 Що таке множення?
          </button>

          <button
            onClick={() => setCurrentScreen('race')}
            style={{ padding: '20px', fontSize: '24px', fontWeight: 'bold', background: '#4CAF50', color: 'white', border: 'none', borderRadius: 15, cursor: 'pointer', marginBottom: 20, boxShadow: '0 6px 0 #2E7D32' }}
          >
            🚀 ГРАТИ
          </button>

          <button
            onClick={() => setCurrentScreen('garage')}
            style={{ padding: '15px', fontSize: '18px', background: '#2196F3', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer' }}
          >
            🔧 Гараж
          </button>
        </div>
      )}

      {/* ГАРАЖ */}
      {currentScreen === 'garage' && (
        <Garage 
          cars={CARS_DB}
          coins={coins}
          unlockedCars={unlockedCars}
          selectedCarId={selectedCarId}
          onSelectCar={setSelectedCarId}
          onBuyCar={handleBuyCar}
          onBack={() => setCurrentScreen('lobby')}
        />
      )}

      {/* ПОЯСНЕННЯ */}
      {currentScreen === 'explanation' && (
        <Explanation
          onBack={() => setCurrentScreen('lobby')}
          onPlay={() => setCurrentScreen('race')}
        />
      )}

      {/* ГОНКА */}
      {currentScreen === 'race' && (
        <Race
          level={selectedLevel}
          carCrashImage={currentCar.crashImage} // Передаємо вибраний рівень у гонку!
          carImage={currentCarImage} // Передаємо картинку вибраної машини
           bgImage={LEVEL_BACKGROUNDS[selectedLevel] || 'bgLevel1'}
           bgMusic={LEVEL_MUSIC[selectedLevel] || 'musicLevel1'}
          onFinish={(earnedCoins, isVictory) => {
            setCoins((c) => c + earnedCoins);
            
            // ЕСЛИ ПОБЕДА И ЭТОГО УРОВНЯ ЕЩЕ НЕТ В СПИСКЕ ПРОЙДЕННЫХ:
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