import React from 'react';
import { CARS } from '../../core/constants';

interface LobbyProps {
  coins: number;
  currentCarId: string;
  onPlay: () => void;
  onGarage: () => void;
}

export default function Lobby({ coins, currentCarId, onPlay, onGarage }: LobbyProps) {
  const currentCar = CARS.find(c => c.id === currentCarId) || CARS[0];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#16213e' }}>
      
      <div style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(0,0,0,0.5)', padding: '10px 20px', borderRadius: 20 }}>
        <h2 style={{ color: '#ffd700', margin: 0 }}>💰 {coins}</h2>
      </div>

      <h1 style={{ color: 'white', fontSize: '32px', marginBottom: '40px', textShadow: '2px 2px 0 #000' }}>
        МАТЕМАТИЧНА<br/>ГОНКА
      </h1>

      <div style={{ fontSize: '100px', animation: 'carBounce 1s infinite alternate', marginBottom: '40px' }}>
        {currentCar.emoji}
      </div>

      <button 
        onClick={onPlay} 
        style={{ 
          width: '80%', padding: '20px', fontSize: '28px', fontWeight: 'bold', 
          background: '#4CAF50', color: 'white', border: 'none', borderRadius: 20, 
          boxShadow: '0 8px 0 #2E7D32', cursor: 'pointer', marginBottom: 20 
        }}
      >
        🚀 ГРАТИ
      </button>

      <button 
        onClick={onGarage} 
        style={{ 
          width: '80%', padding: '15px', fontSize: '20px', fontWeight: 'bold',
          background: '#2196F3', color: 'white', border: 'none', borderRadius: 15, 
          boxShadow: '0 6px 0 #0d47a1', cursor: 'pointer' 
        }}
      >
        🔧 ГАРАЖ
      </button>
    </div>
  );
}