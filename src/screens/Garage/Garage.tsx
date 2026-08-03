import React from 'react';
import { CARS } from '../../core/constants';
import { PlayerData } from '../../core/types';

interface GarageProps {
  playerData: PlayerData;
  setPlayerData: (data: PlayerData) => void;
  onBack: () => void;
}

export default function Garage({ playerData, setPlayerData, onBack }: GarageProps) {
  
  const handleBuyOrSelect = (carId: string, price: number) => {
    const isUnlocked = playerData.unlockedCars.includes(carId);

    if (isUnlocked) {
      // Просто вибираємо машину
      setPlayerData({ ...playerData, currentCarId: carId });
    } else {
      // Купуємо машину
      if (playerData.coins >= price) {
        setPlayerData({
          ...playerData,
          coins: playerData.coins - price,
          unlockedCars: [...playerData.unlockedCars, carId],
          currentCarId: carId, // Одразу сідаємо в неї
        });
      } else {
        alert('Не вистачає монет! Треба вирішити ще кілька прикладів 😉');
      }
    }
  };

  return (
    <div style={{ padding: 20, height: '100%', overflowY: 'auto', backgroundColor: '#1a1a2e' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <button onClick={onBack} style={{ padding: '10px 15px', borderRadius: 10, background: '#333', color: 'white', border: 'none' }}>
          ⬅ Назад
        </button>
        <h2 style={{ color: '#ffd700', margin: 0 }}>💰 {playerData.coins}</h2>
      </div>

      <h1 style={{ textAlign: 'center', color: 'white', marginBottom: 20 }}>ГАРАЖ</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        {CARS.map(car => {
          const isUnlocked = playerData.unlockedCars.includes(car.id);
          const isSelected = playerData.currentCarId === car.id;

          return (
            <div key={car.id} style={{ 
              background: isSelected ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255,255,255,0.1)', 
              border: isSelected ? '2px solid #4CAF50' : '2px solid transparent',
              padding: 15, borderRadius: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div style={{ fontSize: '40px' }}>{car.emoji}</div>
              <div style={{ flex: 1, marginLeft: 15, color: 'white' }}>
                <h3 style={{ margin: 0 }}>{car.name}</h3>
                {!isUnlocked && <span style={{ color: '#ffd700' }}>Ціна: {car.price} 💰</span>}
              </div>
              
              <button 
                onClick={() => handleBuyOrSelect(car.id, car.price)}
                style={{
                  padding: '10px 20px', borderRadius: 10, border: 'none', fontWeight: 'bold',
                  background: isSelected ? '#4CAF50' : isUnlocked ? '#2196F3' : playerData.coins >= car.price ? '#ff9800' : '#555',
                  color: 'white', cursor: 'pointer'
                }}
              >
                {isSelected ? 'ВИБРАНО' : isUnlocked ? 'СІСТИ' : 'КУПИТИ'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}