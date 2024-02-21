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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {movImages.map((mov) => (
                <section 
                    className="hero" 
                    style={{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0.42) 17.31%, #111 101.85%),
                    url(https://image.tmdb.org/t/p/original//${mov?.backdrops[0]?.file_path})`}}
                    key={mov.id}
                >
                {isHome === true ? (
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w500//${mov?.logos[0]?.file_path}`} alt="hero-img"/>   
                        <ul>
                            <li>{movData.release_date?.slice(0, 4)}</li>
                            {movData.genres ? movData.genres.slice(0,2).map((genre) => (
                                <li key={genre.id}>{genre.name}</li>
                            )) : null}
                            <li>{MovieDuration}</li>
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
