import React, { useEffect, useRef, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from '../../API/axios';
import { API_KEY } from '../../API/requests';
import './MovieModal.css';

const base_url = "https://image.tmdb.org/t/p/w1280";

/** Pick the best YouTube video for a title: official trailer first, then any trailer, then a teaser. */
function pickVideo(videos) {
    const yt = videos.filter((v) => v.site === "YouTube" && v.key);
    return (
        yt.find((v) => v.type === "Trailer" && v.official) ||
        yt.find((v) => v.type === "Trailer") ||
        yt.find((v) => v.type === "Teaser") ||
        yt[0] ||
        null
    );
}

const MovieModal = ({ id, media_type, backdrop_path, title, overview, name, release_date, first_air_date, vote_average, mediaType, setModalVisibility }) => {
    const [videoKey, setVideoKey] = useState(null);
    const [status, setStatus] = useState("loading"); // loading | ready | none
    const modalRef = useRef(null);
    const type = media_type || mediaType || (name && !title ? "tv" : "movie");

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                let videos = [];
                if (id) {
                    const { data } = await axios.get(`/${type}/${id}/videos?api_key=${API_KEY}`);
                    videos = data.results || [];
                    if (videos.length === 0) {
                        // Some titles only have videos in their original language.
                        const alt = await axios.get(`/${type}/${id}/videos?api_key=${API_KEY}&include_video_language=en,null,hi,es,fr,de,ja,ko`);
                        videos = alt.data.results || [];
                    }
                }
                if (videos.length === 0 && (title || name)) {
                    const search = await axios.get(`/search/${type}?api_key=${API_KEY}&query=${encodeURIComponent(title || name)}`);
                    const hit = search.data.results?.[0];
                    if (hit) {
                        const { data } = await axios.get(`/${type}/${hit.id}/videos?api_key=${API_KEY}`);
                        videos = data.results || [];
                    }
                }
                const best = pickVideo(videos);
                if (!cancelled) { setVideoKey(best ? best.key : null); setStatus(best ? "ready" : "none"); }
            } catch (error) {
                console.warn("Trailer lookup failed", error?.message);
                if (!cancelled) setStatus("none");
            }
        }
        load();
        return () => { cancelled = true; };
    }, [id, type, title, name]);

    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") setModalVisibility(false); };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
    }, [setModalVisibility]);

    const year = (release_date || first_air_date || "").slice(0, 4);
    const rating = vote_average ? Math.round(vote_average * 10) : null;

    return (
        <div className="presentation" role="dialog" aria-modal="true" aria-label={title || name}>
            <div className="backdrop" onClick={() => setModalVisibility(false)} />
            <div className="wrapper-modal">
                <div className="modal" ref={modalRef}>
                    <button onClick={() => setModalVisibility(false)} className="modal-close" aria-label="Close">
                        <CancelIcon />
                    </button>

                    <div className="modal__video-container">
                        {status === "ready" && videoKey ? (
                            <iframe
                                className="youtube-player"
                                src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                                title={`${title || name} trailer`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <>
                                {backdrop_path && <img alt="" className="modal__poster-img" src={`${base_url}${backdrop_path}`} />}
                                {status === "loading" && <div className="modal__status">Finding a trailer…</div>}
                                {status === "none" && <div className="modal__status">No trailer available for this title.</div>}
                            </>
                        )}
                    </div>

                    <div className="modal__content">
                        <p className="modal__details">
                            {rating !== null && <span className="modal__user-perc">{rating}% match</span>}{" "}
                            {year && <span>{year}</span>}{" "}
                            <span className="modal__type">{type === "tv" ? "Series" : "Film"}</span>
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
