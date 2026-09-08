import React, { useEffect, useRef, useState } from "react";
import { fetchList } from "../API/fetchList";
import "./Row.css";
import MovieModal from './MovieModal';

const base_url = "https://image.tmdb.org/t/p/";

function Row({ title, fetchKey, isLargeRow = false, id, mediaType = 'movie' }) {
    const [movies, setMovies] = useState(null); // null = loading
    const [offline, setOffline] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [movieSelected, setMovieSelection] = useState({});
    const rowRef = useRef(null);
    const scrollIntervalRef = useRef(null);
    const isHoveredRef = useRef(false);
    const directionRef = useRef(1);

    useEffect(() => {
        let cancelled = false;
        fetchList(fetchKey).then(({ results, offline }) => {
            if (cancelled) return;
            setMovies(results.filter((m) => (isLargeRow ? m.poster_path : m.backdrop_path)));
            setOffline(offline);
        });
        return () => { cancelled = true; };
    }, [fetchKey, isLargeRow]);

    // Slow auto-scroll that bounces at the ends. Paused while hovered or while the modal is open.
    useEffect(() => {
        const el = rowRef.current;
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (!el || isMobile || !movies || movies.length === 0) return;
        const tick = () => {
            if (isHoveredRef.current || modalVisibility) return;
            el.scrollLeft += 1.5 * directionRef.current;
            if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) directionRef.current = -1;
            else if (el.scrollLeft <= 0) directionRef.current = 1;
        };
        scrollIntervalRef.current = setInterval(tick, 30);
        return () => clearInterval(scrollIntervalRef.current);
    }, [movies, modalVisibility]);

    const handleClick = (movie) => {
        setModalVisibility(true);
        setMovieSelection(movie);
    };

    const size = isLargeRow ? "w342" : "w500";

    return (
        <div className="row" id={id}>
            <h2>
                {title}
                {offline && <span className="row__badge" title="TMDB could not be reached; showing a saved snapshot">offline snapshot</span>}
            </h2>
            <div
                className="row__posters"
                ref={rowRef}
                onMouseEnter={() => { isHoveredRef.current = true; }}
                onMouseLeave={() => { isHoveredRef.current = false; }}
            >
                {movies === null && Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className={`row__poster row__poster--skeleton ${isLargeRow ? "row__posterLarge" : ""}`} />
                ))}
                {movies && movies.length === 0 && <p className="row__empty">Nothing to show right now.</p>}
                {movies && movies.map((movie, index) => {
                    const name = movie.name || movie.title || "";
                    const year = (movie.release_date || movie.first_air_date || "").slice(0, 4);
                    return (
                        <button
                            key={movie.id + "-" + index}
                            type="button"
                            className={`row__card ${isLargeRow ? "row__card--large" : ""}`}
                            onClick={() => handleClick(movie)}
                            aria-label={name}
                        >
                            <img
                                className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
                                src={`${base_url}${size}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                loading="lazy"
                                alt=""
                            />
                            <span className="row__caption">
                                <span className="row__name">{name}</span>
                                {year && <span className="row__year">{year}</span>}
                            </span>
                        </button>
                    );
                })}
            </div>
            {modalVisibility && <MovieModal {...movieSelected} mediaType={movieSelected.media_type || mediaType} setModalVisibility={setModalVisibility} />}
        </div>
    );
}

export default Row;
