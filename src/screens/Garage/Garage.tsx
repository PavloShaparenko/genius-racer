import React from 'react';
import './Garage.css'; // Создай этот файл для стилей, если нужно

// Описываем, как выглядит объект машины
export interface CarDef {
  id: string;
  name: string;
  price: number;
  image: string;
crashImage: string;
}

interface GarageProps {
  cars: CarDef[];
  coins: number;
  unlockedCars: string[];
  selectedCarId: string;
  onSelectCar: (id: string) => void;
  onBuyCar: (id: string, price: number) => void;
  onBack: () => void;
}

export default function Garage({ 
  cars, coins, unlockedCars, selectedCarId, onSelectCar, onBuyCar, onBack 
}: GarageProps) {

  const handleCarClick = (car: CarDef) => {
    const isUnlocked = unlockedCars.includes(car.id);

    if (isUnlocked) {
      // Если куплена - просто выбираем
      onSelectCar(car.id);
    } else {
      // Если не куплена - пытаемся купить
      if (coins >= car.price) {
        onBuyCar(car.id, car.price);
      } else {
        // Звук ошибки или просто алерт
        alert(`Не хватает монет! Нужно еще ${car.price - coins} 💰`);
      }
    }
  };

  return (
    <div className="garage-screen" style={{ padding: '20px', background: '#1a1a2e', minHeight: '100vh', color: 'white' }}>
      
      {/* Шапка */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button onClick={onBack} style={{ padding: '10px 20px', fontSize: '18px', borderRadius: '10px', cursor: 'pointer' }}>
          ⬅ Назад
        </button>
        <h2 style={{ color: '#ffd700', margin: 0 }}>💰 {coins}</h2>
      </div>

      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>ГАРАЖ</h1>

      {/* Список машин */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {cars.map((car) => {
          const isUnlocked = unlockedCars.includes(car.id);
          const isSelected = selectedCarId === car.id;

          return (
            <div 
              key={car.id} 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: isSelected ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                border: isSelected ? '2px solid #4caf50' : '2px solid transparent',
                padding: '15px',
                borderRadius: '15px'
              }}
            >
              {/* Картинка машины */}
              <img src={car.image} alt={car.name} style={{ width: '80px', height: 'auto', transform: 'scaleX(-1)' }} />
              
              {/* Название и цена */}
              <div style={{ flex: 1, marginLeft: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '22px' }}>{car.name}</h3>
                {!isUnlocked && <p style={{ margin: '5px 0 0', color: '#ffd700' }}>Цена: {car.price} 💰</p>}
              </div>

              {/* Кнопка действия */}
              <button 
                onClick={() => handleCarClick(car)}
                style={{
                  padding: '12px 20px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  background: isSelected ? '#4caf50' : isUnlocked ? '#2196f3' : coins >= car.price ? '#ff9800' : '#555',
                  color: 'white'
                }}
              >
                {isSelected ? 'Обрана' : isUnlocked ? 'Сісти' : 'Купити'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}