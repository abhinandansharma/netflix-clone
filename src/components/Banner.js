import React,{useState,useEffect} from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { fetchList } from "../API/fetchList";
import "./Banner.css";
import MovieModal from './MovieModal';

const Banner= ()=> {
    const [movie,setMovie] = useState(null);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [movieSelected, setMovieSelection] = useState({});

    const truncate = (str, n)=> {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    useEffect(() => {
        let cancelled = false;
        fetchList("fetchNetflixOriginals").then(({ results }) => {
            if (cancelled) return;
            const withArt = results.filter((m) => m.backdrop_path);
            setMovie(withArt[Math.floor(Math.random() * withArt.length)] || null);
        });
        return () => { cancelled = true; };
    }, []);
    
    const handleClick = (movie) => {
        setModalVisibility(true);
        setMovieSelection(movie);
    }

    return (
        <header className="banner"
            style={{
                backgroundImage : movie?.backdrop_path ? `url("https://image.tmdb.org/t/p/w1280${movie.backdrop_path}")` : "linear-gradient(180deg, #141414, #000)",
                backgroundPosition : "top center",
                backgroundSize: "cover",
            }}
        >
            <div className="banner__contents">
                {/**Tittle */}
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button play" onClick={() => handleClick(movie)}><PlayArrowIcon />Play</button>
                    <button className="banner__button info" onClick={() => handleClick(movie)}><InfoOutlinedIcon fontSize="small"/><div className="space"></div> More Information</button>
                    
                </div>
                {/**DIV > 2 BUTTONS */}

                <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
                {/*Description*/}
            </div>   
            <div className="banner--fadeBottom"/>
            {modalVisibility && <MovieModal {...movieSelected} setModalVisibility={setModalVisibility} />}
        </header>
    )
}

export default Banner;