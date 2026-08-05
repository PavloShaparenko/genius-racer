import React from 'react';
import './Explanation.css';
import { useLanguage } from '../../i18n/LanguageContext';

interface ExplanationProps {
  onBack: () => void;
  onPlay: () => void;
}

export default function Explanation({ onBack, onPlay }: ExplanationProps) {
  const { t } = useLanguage();

  return (
    <div className="explanation-container">
      <h1 className="explanation-title">{t.explTitle}</h1>
      <p className="explanation-intro">{t.explIntro}</p>

      <div className="card card-magic">
        <h2 className="card-title">{t.explSecretTitle}</h2>
        <p className="example-text">{t.explSecretText1}</p>
        <p className="example-text">{t.explSecretText2}</p>
      </div>

      <div className="card card-example">
        <h2 className="card-title">{t.explCarsTitle}</h2>
        <p className="example-text">{t.explCarsText1}</p>
        <div className="emoji-row">(🚗🚗) + (🚗🚗) + (🚗🚗)</div>
        <p className="example-text">{t.explCarsText2}</p>
        <p className="example-text">{t.explCarsText3}</p>
      </div>

      <div className="card">
        <h2 className="card-title">{t.explCandyTitle}</h2>
        <p className="example-text">{t.explCandyText1}</p>
        <div className="emoji-row">🍬🍬🍬 | 🍬🍬🍬 | 🍬🍬🍬 | 🍬🍬🍬</div>
        <p className="example-text">{t.explCandyText2}</p>
      </div>

      <div className="buttons-container">
        <button onClick={onBack} className="btn btn-back">{t.backBtn}</button>
        <button onClick={onPlay} className="btn btn-play">{t.explPlayBtn}</button>
      </div>
    </div>
  );
}