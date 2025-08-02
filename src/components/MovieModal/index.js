import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import CancelIcon from '@mui/icons-material/Cancel';
import axios from '../../API/axios';
import './MovieModal.css';

const API_KEY = "896c8566fc255f7c52f6ea6bd2901188";

const MovieModal = ({
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    setModalVisibility
}) => {
    const base_url = "https://image.tmdb.org/t/p/original/";
    const [trailerUrl, setTrailerUrl] = useState("");
    const [userPercentage, setUserPercentage] = useState(null);
    const [playerError, setPlayerError] = useState(false);

    const modalRef = useRef(null);

    useEffect(() => {
        setUserPercentage(Math.floor(Math.random() * 100));
    }, []);

    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const movieName = title || name;
                if (!movieName) return;

                try {
                    const url = await movieTrailer(`${movieName} official trailer`);
                    if (url) {
                        const urlParams = new URLSearchParams(new URL(url).search);
                        const videoId = urlParams.get('v');
                        if (videoId) {
                            setTrailerUrl(`https://www.youtube.com/watch?v=${videoId}`);
                            return;
                        }
                    }
                } catch {
                    console.log("movie-trailer search failed, trying TMDB API");
                }

                const searchType = name ? 'tv' : 'movie';
                const searchResponse = await axios.get(
                    `/search/${searchType}?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`
                );

                if (searchResponse.data.results.length > 0) {
                    const id = searchResponse.data.results[0].id;
                    const videosResponse = await axios.get(
                        `/${searchType}/${id}/videos?api_key=${API_KEY}`
                    );

                    const trailer = videosResponse.data.results.find(video =>
                        ["Trailer", "Teaser"].includes(video.type)
                    );

                    if (trailer?.key) {
                        setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
                        return;
                    }
                }

            } catch (error) {
                console.error("Error fetching trailer:", error);
            }
        };

        fetchTrailer();
    }, [title, name]);


    useEffect(() => {
        // Handle click outside modal
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModalVisibility(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setModalVisibility]);

return (
    <div className="presentation">
        <div className="backdrop" onClick={() => setModalVisibility(false)} />
        <div className="wrapper-modal">
            <div className="modal" ref={modalRef}>
                <span onClick={() => setModalVisibility(false)} className="modal-close">
                    <CancelIcon />
                </span>

                <div className="modal__video-container">
                    {trailerUrl && !playerError ? (
                        <ReactPlayer
                            url={trailerUrl}
                            playing={true}
                            controls={true}
                            width="100%"
                            height="100%"
                            className="youtube-player"
                            onError={() => setPlayerError(true)}
                        />
                    ) : (
                        <img
                            alt="poster"
                            className="modal__poster-img"
                            src={`${base_url}${backdrop_path}`}
                        />
                    )}
                </div>

                <div className="modal__content">
                    <p className="modal__details">
                        <span className="modal__user-perc">{userPercentage}% for you</span>{" "}
                        {release_date || first_air_date}
                    </p>
                    <h2 className="modal__title">{title || name}</h2>
                    <p className="modal__overview">{overview}</p>
                </div>
            </div>
        </div>
    </div>
);
};

export default MovieModal;