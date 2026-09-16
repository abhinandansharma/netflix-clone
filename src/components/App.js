import React, { useEffect } from 'react';
import Row from "./Row";
import Banner from "./Banner";
import Nav from "./Nav";
import './App.css';

const App = () => {

  useEffect(() => {
    const faders = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    faders.forEach(fader => observer.observe(fader));
  }, []);
  return (
    <div className="app">
      <Nav />

      <div id="home">
        <Banner />
      </div>

      <div id="originals" className="fade-in-section">
        <Row
          title="Netflix Originals"
          id="NO"
          fetchKey="fetchNetflixOriginals"
          mediaType="tv"
          isLargeRow
        />
      </div>

      <div id="trending" className="fade-in-section">
        <Row
          title="Trending Now"
          id="TN"
          fetchKey="fetchTrending"
        />
      </div>

      <div id="toprated" className="fade-in-section">
        <Row
          title="Top Rated"
          id="TR"
          fetchKey="fetchTopRated"
        />
      </div>

      <div id="action" className="fade-in-section">
        <Row
          title="Action Movies"
          id="AM"
          fetchKey="fetchActionMovies"
        />
      </div>

      <div id="comedy" className="fade-in-section">
        <Row
          title="Comedy Movies"
          id="CM"
          fetchKey="fetchComedyMovies"
        />
      </div>

      <div id="horror" className="fade-in-section">
        <Row
          title="Horror Movies"
          id="HM"
          fetchKey="fetchHorrorMovies"
        />
      </div>
      <footer className="site-footer">
        <a className="made-by" href="https://abhinandansharma.github.io/portfolio/" target="_blank" rel="noreferrer" aria-label="Made by Abhinandan Sharma. Opens the portfolio."><svg className="made-by-mark" viewBox="0 0 512 512" width="20" height="20" aria-hidden="true"><defs><clipPath id="mb-clip"><rect width="512" height="512" rx="112"/></clipPath></defs><rect width="512" height="512" rx="112" fill="#e0202a"/><g clipPath="url(#mb-clip)"><path d="M256 78 C156 78 100 154 100 254 L100 540 L412 540 L412 254 C412 154 356 78 256 78 Z" fill="#0b0b0b"/><path d="M404 206 Q470 178 518 132 Q492 224 410 252 Z" fill="#0b0b0b"/><path d="M406 232 Q468 240 512 292 Q462 262 408 250 Z" fill="#0b0b0b"/><path d="M118 232 Q256 196 394 232 L394 262 Q256 304 118 262 Z" fill="#f1ede4"/><path d="M152 248 L238 234 L242 270 L166 280 Z" fill="#0b0b0b"/><path d="M360 248 L274 234 L270 270 L346 280 Z" fill="#0b0b0b"/></g></svg><span>Made by <b>Abhinandan</b></span></a>
        <span className="site-footer__note">Film data from TMDB. Not affiliated with Netflix.</span>
        <a className="site-footer__link" href="https://github.com/abhinandansharma/netflix-clone" target="_blank" rel="noreferrer">Source</a>
      </footer>
    </div>
  );
};

export default App;