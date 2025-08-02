import React,{useState,useEffect} from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import axios from "../API/axios";
import requests from "../API/requests";
import "./Banner.css";
import MovieModal from './MovieModal';

const Banner= ()=> {
    const [movie,setMovie] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [movieSelected, setMovieSelection] = useState({});

    const truncate = (str, n)=> {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals)
            //Give to our movie hook one of all the movies randomly
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length -1)
            ]);
            return request;
        }
        fetchData();
        
    },[]);
    
    const handleClick = (movie) => {
        setModalVisibility(true);
        setMovieSelection(movie);
    }

    return (
        <header className="banner"
            style={{
                backgroundImage : `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                    )`,
                backgroundPosition : "top center",
                backgroundSize: "cover",
            }}
        >
            <div className="banner__contents">
                {/**Tittle */}
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button play" onClick={() => handleClick(movie)}><PlayArrowIcon />Play</button>
                    <button className="banner__button info" onClick={() => handleClick(movie)}><InfoOutlinedIcon fontSize="small"  paddingRight={20} marginRight={100}/><div className="space"></div> More Information</button>
                    
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