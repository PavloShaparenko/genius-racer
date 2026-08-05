import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext'; // <--- ДОДАЙ ЦЕ

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>  {/* <--- ОБЕРНИ APP */}
      <App />
    </LanguageProvider>
  </React.StrictMode>
);