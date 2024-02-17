import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMovie } from "../hooks/useMovie";
import axios from 'axios';
import Header from "./Header";
import MovieHero from "./MovieHero";
import Footer from "./Footer";
import ReactPlayer from "react-player";

const Producto = () => {
    const { id, type } = useParams();
    const {
        movData,
        movCredits,
        movSimilar,
        movTrailers,
        watchProvAR,
        MovieDuration,
    } = useMovie(id, null, type);
    
    const [movImages, setMovImages] = useState([])
    
    const movieImages = () => {
    const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${type}/${id}/images?api_key=01864e118c53cc6ab3c40e90d03443b0&include_image_language=en`,
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

    console.log(movData)
    
    return (
        <main className="movie_container">
            <Header />

            <MovieHero movieID={id} isHome={false} query={type}/>

            <section className="container grid-bd first">
            <header className="hero_movie">
                {movImages.map((mov) => (
                <div key={mov.id}>
                    <img src={`https://image.tmdb.org/t/p/w500//${mov?.logos[0]?.file_path}`} alt="movie-img"/>  
                    <ul>
                        <li>{type === "movie" ? movData.release_date?.slice(0, 4) : movData.first_air_date?.slice(0, 4)}</li>
                        {movData.genres ? movData.genres.slice(0,2).map((genre) => (
                        <li key={genre.id}>{genre.name}</li>
                        )) : null}
                        <li>{type === "movie" ? MovieDuration + ' hrs.' : movData.number_of_seasons + ' Temporadas'}</li>
                    </ul>
                </div> 
                ))}
                {movData.overview ? (
                <div className="container__movie-data">
                    <h4>Sinópsis</h4>
                    <p>{movData.overview}</p>
                </div>
                ) : null}

            </header>
            <article>
                {watchProvAR && watchProvAR?.flatrate ? (
                <>
                    <h4>Pod&eacute;s verlo en: </h4>
                    <div className="watch_provider">
                    {watchProvAR
                        ? watchProvAR?.flatrate?.map((watch) => (
                            <div key={watch.provider_id}>
                            <a href={watchProvAR.link} target="__blank">
                                <img
                                src={`https://image.tmdb.org/t/p/w200/${watch.logo_path}`}
                                style={{ borderRadius: "10px" }}
                                alt="img-watch"
                                />
                            </a>
                            </div>
                        ))
                        : null}
                    </div>
                </>
                ) : null}
            </article>
            <footer>
                <h4>Cast</h4>
                <ul className="movie__data-cast">
                {movCredits.cast?.slice(0, 7)?.map((mov) => (
                    <li key={mov.cast_id}>  
                    <img src={`https://image.tmdb.org/t/p/w200/${mov.profile_path}`} alt="img-credits"/>
                    <span>{mov.character}</span>
                    <p>{mov.name}</p>
                    </li>
                ))}
                </ul>
            </footer>
            </section>

            <section className="container grid-bd">
            <header>
                <h4>Trailers</h4>
            </header>
            <article>
                <ul className="carousel_trailers">
                {movTrailers?.results ? (
                    <li className="movie__trailers">
                    <div className="movie__trailers-videos">
                        {movTrailers.results?.slice(0, 5)?.map((mov) => (
                        <div className="videos" key={mov.key}>
                            <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${mov.key}`}
                            />
                        </div>
                        ))}
                    </div>
                    </li>
                ) : null}
                </ul>
            </article>
            <footer></footer>
            </section>

            <section className="container grid-bd container__movie-similar">
            <h4>Contenido qué podría interesarte</h4>
            <article className="carousel__movie">
                <div className="carousel__container__movie">
                {movSimilar?.results?.map((mov) => (
                    <div className="carousel__item__movie" key={mov.id}>
                    <Link to={`/producto/${mov.id}`}>
                        <img
                        src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
                        className="item-img__movie"
                        alt="img-movies"
                        />
                    </Link>
                    </div>
                ))}
                </div>
            </article>
            </section>
        
            <Footer />
        </main>
    )
}

export default Producto