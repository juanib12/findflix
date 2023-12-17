import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useMovie } from "../hooks/useMovie";
import axios from "axios";

const MovieHero = ({movieID, isHome, query}) => {
    const [movImages, setMovImages] = useState([])
    const {
        movData,
        MovieDuration,
    } = useMovie(movieID, null, "movie");
    
    const movieImages = () => {
        const options = {
            method: "GET",
            url: `https://api.themoviedb.org/3/${query}/${movieID}/images?api_key=01864e118c53cc6ab3c40e90d03443b0&include_image_language=en`,
        };
        axios
        .request(options)
        .then((res) => {
            setMovImages([res.data]);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        movieImages()
    }, [])

    console.log(movData)

    return (
        <>
            {movImages.map((mov) => (
                <section 
                    className="hero" 
                    style={{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0.42) 17.31%, #111 101.85%),
                    url(https://image.tmdb.org/t/p/original//${mov?.backdrops[0]?.file_path})`}}
                    key={mov.id}
                >
                {isHome == true ? (
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w500//${mov?.logos[0]?.file_path}`}/>   
                        <ul>
                            <li>{movData.release_date?.slice(0, 4)}</li>
                            <li>{movData.genres[0].name}</li>
                            <li>{movData.genres[1].name}</li>
                            <li>{MovieDuration} hrs.</li>
                        </ul>
                        <span>{movData.overview}</span>  
                        <em></em>
                    </div> 
                ) : null}
                </section>
            ))}
        </>
    )
}

export default MovieHero;
