import React, { useEffect, useRef, useState } from "react";
import axios from "../API/axios";
import "./Row.css";
import MovieModal from './MovieModal';


const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow = false, id }) {
    const [movies, setMovies] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [movieSelected, setMovieSelection] = useState({})
    const rowRef = useRef(null);
    const scrollIntervalRef = useRef(null);
    const isHoveredRef = useRef(false);
    const isMobile = window.innerWidth <= 768;

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        };
        fetchData();
    }, [fetchUrl]);

    useEffect(() => {
        if (!rowRef.current || isMobile) return;

        let direction = 1;

        const startScroll = () => {
            clearInterval(scrollIntervalRef.current); // prevent multiple intervals

            scrollIntervalRef.current = setInterval(() => {
                if (!rowRef.current || isHoveredRef.current || modalVisibility) return;

                const el = rowRef.current;
                const scrollAmount = 1.5;
                el.scrollLeft += scrollAmount * direction;

                const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
                const atStart = el.scrollLeft <= 0;

                if (atEnd) direction = -1;
                else if (atStart) direction = 1;
            }, 30);
        };

        startScroll(); // start initially

        return () => clearInterval(scrollIntervalRef.current); // cleanup
    }, [movies, isMobile, modalVisibility]);

    const handleMouseEnter = () => {
        if (!isMobile) {
            isHoveredRef.current = true;
            clearInterval(scrollIntervalRef.current); // stop scrolling on hover
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            isHoveredRef.current = false;

            if (modalVisibility) return;
            // restart auto-scroll
            const el = rowRef.current;
            if (el && !scrollIntervalRef.current) {
                el.scrollLeft += 0.1; // nudge
            }
            // restart scroll
            let direction = 1;
            scrollIntervalRef.current = setInterval(() => {
                if (!rowRef.current || isHoveredRef.current) return;

                const scrollAmount = 1.5;
                el.scrollLeft += scrollAmount * direction;

                const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
                const atStart = el.scrollLeft <= 0;

                if (atEnd) direction = -1;
                else if (atStart) direction = 1;
            }, 30);
        }
    };

    const handleClick = (movie) => {
        setModalVisibility(true);
        setMovieSelection(movie);
    }

    return (
        <div className="row" id={id}>
            <h2>{title}</h2>
            <div
                className="row__posters"
                ref={rowRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {movies.map((movie, index) => (
                    <img
                        key={movie.id + "-" + index}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                            }`}
                        onClick={() => handleClick(movie)}
                        loading="lazy"
                        alt={movie.name}
                        style={{ cursor: "pointer" }}
                    />
                ))}
            </div>
            {modalVisibility && <MovieModal {...movieSelected} setModalVisibility={setModalVisibility} />}
        </div>
    );
}

export default Row;