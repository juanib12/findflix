import { Link, useParams} from "react-router-dom";
import Header from "./Header";
import ReactPlayer from "react-player";
import Footer from "./Footer";
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

  return (
    <div>
      <Header />
      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <section className="container grid-bd">
          <div key={movData.id} className="container__movie">
            <div className="contenedor">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movData.poster_path}`}
              />
              <div className="movie__data">
                <div className="movie__data-genre">
                  <h4>GÉNEROS: </h4>
                  {movData.genres?.map((mov) => (
                    <p key={mov.name}> {mov.name} - </p>
                  ))}
                </div>
                <div className="movie__data-duration">
                  <h4>DURACIÓN: {MovieDuration} hrs.</h4>
                </div>
                <div className="movie__data-cast">
                  <h4>CAST: </h4>
                  {movCredits.cast?.slice(0, 5)?.map((mov) => (
                    <p key={mov.cast_id}> {mov.name} - </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="contenedor">
              <div className="container__movie-title">
                <h2>{movData.title}</h2>
                <h2>({movData?.release_date?.slice(0, 4)})</h2>
              </div>
              {watchProvAR ? (
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
              ) : null}

              {movTrailers?.results ? (
                <div className="movie__trailers">
                  <h3>Trailers:</h3>
                  <div className="movie__trailers-videos">
                    {movTrailers.results?.map((mov) => (
                      <div className="videos">
                        <ReactPlayer
                          url={`https://www.youtube.com/watch?v=${mov.key}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {movData.overview ? (
                <div className="container__movie-data">
                  <h3>Sinópsis</h3>
                  <p>{movData.overview}</p>
                </div>
              ) : null}

              <div className="container__movie-similar">
                <h3>Contenido qué podría interesarte: </h3>
                <section className="carousel__movie">
                  <div className="carousel__container__movie">
                    {movSimilar?.results?.map((mov) => (
                      <div className="carousel__item__movie" key={mov.id}>
                        <Link to={`/producto/${mov.id}`}>
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
                            className="item-img__movie"
                            style={{ width: "150px", height: "200px" }}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default Movie;
