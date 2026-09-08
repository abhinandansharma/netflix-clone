import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <a className="made-by" href="https://abhinandansharma.github.io/portfolio/" target="_blank" rel="noreferrer" aria-label="Made by Abhinandan Sharma. Opens the portfolio."><span className="made-by-dot"></span>Made by Abhinandan <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></a>
  </React.StrictMode>
);
