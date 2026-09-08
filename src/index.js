import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <a className="made-by" href="https://abhinandansharma.github.io/portfolio/" target="_blank" rel="noreferrer" aria-label="Made by Abhinandan Sharma. Opens the portfolio."><svg className="made-by-mark" viewBox="0 0 512 512" width="20" height="20" aria-hidden="true"><defs><clipPath id="mb-clip"><rect width="512" height="512" rx="112"/></clipPath></defs><rect width="512" height="512" rx="112" fill="#e0202a"/><g clipPath="url(#mb-clip)"><path d="M256 78 C156 78 100 154 100 254 L100 540 L412 540 L412 254 C412 154 356 78 256 78 Z" fill="#0b0b0b"/><path d="M404 206 Q470 178 518 132 Q492 224 410 252 Z" fill="#0b0b0b"/><path d="M406 232 Q468 240 512 292 Q462 262 408 250 Z" fill="#0b0b0b"/><path d="M118 232 Q256 196 394 232 L394 262 Q256 304 118 262 Z" fill="#f1ede4"/><path d="M152 248 L238 234 L242 270 L166 280 Z" fill="#0b0b0b"/><path d="M360 248 L274 234 L270 270 L346 280 Z" fill="#0b0b0b"/></g></svg><span>Made by <b>Abhinandan</b></span></a>
  </React.StrictMode>
);
