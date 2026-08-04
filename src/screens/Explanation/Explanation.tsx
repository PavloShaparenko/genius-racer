import React from 'react';
import './Explanation.css';

interface ExplanationProps {
  onBack: () => void;
  onPlay: () => void;
}

export default function Explanation({ onBack, onPlay }: ExplanationProps) {
  return (
    <div className="explanation-container">
      <h1 className="explanation-title">🦸‍♂️ Множення — це суперсила!</h1>
      
      <p className="explanation-intro">
        Привіт! Ти вже вмієш додавати числа. А множення — це секретний спосіб рахувати <strong>набагато швидше</strong>!
      </p>

      <div className="card card-magic">
        <h2 className="card-title">✨ Головний секрет</h2>
        <p className="example-text">
          Знак множення <strong>« × »</strong> насправді означає маленьке слово <span className="highlight">«ПО»</span>.
        </p>
        <p className="example-text">
          Коли ти бачиш <strong>3 × 2</strong>, це означає: взяти <strong>3</strong> рази <strong>ПО 2</strong>.
        </p>
      </div>

      <div className="card card-example">
        <h2 className="card-title">🏎️ Давай порахуємо машинки!</h2>
        <p className="example-text">
          Уяви, що у тебе є 3 гаражі. У кожному стоїть ПО 2 машинки.
        </p>
        
        <div className="emoji-row">
          (🚗🚗) + (🚗🚗) + (🚗🚗)
        </div>

        <p className="example-text">
          Ти можеш додавати довго: <strong>2 + 2 + 2 = 6</strong>
        </p>
        <p className="example-text">
          Або використати суперсилу множення: <br/>
          <strong>3</strong> (гаражі) <strong>× 2</strong> (машинки) <strong>= 6</strong>
        </p>
      </div>

      <div className="card">
        <h2 className="card-title">🍬 Ще один приклад</h2>
        <p className="example-text">
          Мама дала тобі 4 пакетики. В кожному лежить ПО 3 цукерки.
        </p>
        <div className="emoji-row">
          🍬🍬🍬 | 🍬🍬🍬 | 🍬🍬🍬 | 🍬🍬🍬
        </div>
        <p className="example-text">
          Просто кажемо: <strong>4 рази ПО 3</strong>. <br/>
          Записуємо: <strong>4 × 3 = 12</strong> цукерок!
        </p>
      </div>

      <div className="buttons-container">
        <button onClick={onBack} className="btn btn-back">
          ⬅ Назад
        </button>

        <button onClick={onPlay} className="btn btn-play">
          🚀 Я зрозумів! Грати!
        </button>
      </div>
    </div>
  );
}