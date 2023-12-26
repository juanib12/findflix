import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import ReactPlayer from "react-player";
import Footer from "./Footer";
import MovieHero from "./MovieHero";

import { useEffect, useState } from "react";
import axios from "axios";

import { useMovie } from "../hooks/useMovie";

const Movie = () => {
  const { id } = useParams();
  const {
    movData,
    movCredits,
    movSimilar,
    movWatchProv,
    movTrailers,
    loading,
    watchProvAR,
    MovieDuration,
  } = useMovie(id, null, "movie");

  const [movImages, setMovImages] = useState([])
  
  const movieImages = () => {
    const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}/images?api_key=01864e118c53cc6ab3c40e90d03443b0&include_image_language=en`,
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

  return (
    <main className="movie_container">
      <Header />

      <MovieHero movieID={id} isHome={false} query="movie"/>

      <section className="container grid-bd first">
        <header className="hero_movie">
          {movImages.map((mov) => (
            <div key={mov.id}>
              <img src={`https://image.tmdb.org/t/p/w500//${mov?.logos[0]?.file_path}`}/>  
              <ul>
                  <li>{movData.release_date?.slice(0, 4)}</li>
                  <li>{movData.genres[0].name}</li>
                  <li>{movData.genres[1].name}</li>
                  <li>{MovieDuration} hrs.</li>
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
                <img src={`https://image.tmdb.org/t/p/w200/${mov.profile_path}`} />
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
                  />
                </Link>
              </div>
            ))}
          </div>
        </article>
      </section>
    
      <Footer />
    </main>



    // <div>
    //   <Header />
    //   {loading ? (
    //     <div className="spinner-container">
    //       <div className="loading-spinner"></div>
    //     </div>
    //   ) : (
    //     <section className="container grid-bd">
    //       <div key={movData.id} className="container__movie">
    //         <div className="contenedor">
    //           <a
    //             href={movData.homepage}
    //             target="_blank"
    //             style={{ textDecoration: "none" }}
    //           >
    //             <img
    //               src={`https://image.tmdb.org/t/p/w500/${movData.poster_path}`}
    //             />
    //           </a>
    //           <div className="movie__data">
    //             <div className="movie__data-genre">
    //               <h4>GÉNEROS: </h4>
    //               {movData.genres?.map((mov) => (
    //                 <p key={mov.name}> {mov.name} - </p>
    //               ))}
    //             </div>
    //             <div className="movie__data-duration">
    //               <h4>DURACIÓN: {MovieDuration} hrs.</h4>
    //             </div>
    //             <div className="movie__data-cast">
    //               <h4>CAST: </h4>
    //               {movCredits.cast?.slice(0, 5)?.map((mov) => (
    //                 <p key={mov.cast_id}> {mov.name} - </p>
    //               ))}
    //             </div>
    //             <div className="movie__data-puntaje">
    //               <h4>
    //                 VALORACIÓN:{" "}
    //                 {(movData.vote_average * 10).toString().slice(0, 2)}%
    //               </h4>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="contenedor">
    //           <div className="container__movie-title">
    //             <h2>{movData.title}</h2>
    //             <h2>({movData?.release_date?.slice(0, 4)})</h2>
    //           </div>
    //           {watchProvAR ? (
    //             <div className="watch_provider">
    //               {watchProvAR
    //                 ? watchProvAR?.flatrate?.map((watch) => (
    //                     <div key={watch.provider_id}>
    //                       <a href={watchProvAR.link} target="__blank">
    //                         <img
    //                           src={`https://image.tmdb.org/t/p/w200/${watch.logo_path}`}
    //                           style={{ borderRadius: "10px" }}
    //                         />
    //                       </a>
    //                     </div>
    //                   ))
    //                 : null}
    //             </div>
    //           ) : null}

    //           {movTrailers?.results ? (
    //             <div className="movie__trailers">
    //               <h3>Trailers:</h3>
    //               <div className="movie__trailers-videos">
    //                 {movTrailers.results?.map((mov) => (
    //                   <div className="videos">
    //                     <ReactPlayer
    //                       url={`https://www.youtube.com/watch?v=${mov.key}`}
    //                     />
    //                   </div>
    //                 ))}
    //               </div>
    //             </div>
    //           ) : null}

    //           {movData.overview ? (
    //             <div className="container__movie-data">
    //               <h3>Sinópsis</h3>
    //               <p>{movData.overview}</p>
    //             </div>
    //           ) : null}



    //           <div className="container__movie-similar">
    //             <h3>Contenido qué podría interesarte: </h3>
    //             <section className="carousel__movie">
    //               <div className="carousel__container__movie">
    //                 {movSimilar?.results?.map((mov) => (
    //                   <div className="carousel__item__movie" key={mov.id}>
    //                     <Link to={`/producto/${mov.id}`}>
    //                       <img
    //                         src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
    //                         className="item-img__movie"
    //                         style={{ width: "150px", height: "200px" }}
    //                       />
    //                     </Link>
    //                   </div>
    //                 ))}
    //               </div>
    //             </section>
    //           </div>
    //         </div>
    //       </div>
    //     </section>
    //   )}
    //   <Footer />
    // </div>
  );
};

export default Movie;
