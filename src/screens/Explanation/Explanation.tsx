import React from 'react';

interface ExplanationProps {
  onBack: () => void;
  onPlay: () => void;
}

export default function Explanation({ onBack, onPlay }: ExplanationProps) {
  return (
    <div style={{ padding: 24, maxWidth: 760, margin: '0 auto', color: '#fff', lineHeight: 1.6 }}>
      <h1 style={{ marginBottom: 12, fontSize: 32 }}>📘 Що таке множення?</h1>
      <p style={{ fontSize: 18, marginBottom: 16 }}>
        Множення — це швидкий спосіб додавати однакові числа кілька разів.
      </p>

      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <h2 style={{ marginBottom: 8 }}>Наприклад:</h2>
        <p style={{ fontSize: 20, margin: '8px 0' }}>
          3 × 4 означає: <strong>3 рази по 4</strong>
        </p>
        <p style={{ fontSize: 20, margin: '8px 0' }}>
          4 + 4 + 4 = 12
        </p>
        <p style={{ fontSize: 20, margin: '8px 0' }}>
          Тому <strong>3 × 4 = 12</strong>
        </p>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: 20, marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>Як це працює:</h3>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 17 }}>
          <li>Перший номер — скільки разів повторюємо.</li>
          <li>Другий номер — яке число повторюємо.</li>
          <li>Результат — загальна сума.</li>
        </ul>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={onBack}
          style={{ padding: '12px 18px', fontSize: 16, border: 'none', borderRadius: 10, cursor: 'pointer', background: '#2196F3', color: '#fff' }}
        >
          ⬅ Назад в меню
        </button>

        <button
          onClick={onPlay}
          style={{ padding: '12px 18px', fontSize: 16, border: 'none', borderRadius: 10, cursor: 'pointer', background: '#4CAF50', color: '#fff' }}
        >
          🚀 Почати гру
        </button>
      </div>
    </div>
  );
}
