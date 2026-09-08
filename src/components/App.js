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
          title="NETFLIX ORIGINALS"
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
    </div>
  );
};

export default App;