import { Link } from "react-router-dom";
import { useMovie } from "../hooks/useMovie";

const Series = ({ query }) => {
  const { movie, loading } = useMovie(null, query, "tv");

  return (
    <section className="carousel">
      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="carousel__container">
          <header className="carousel_header">
            {query === "popular" ? (
              <h3>Series más vistas</h3>
            ) : query === "top_rated" ? (
              <h3>Series más valoradas</h3>
            ) : query === "upcoming" ? (
              <h3>Proximamente</h3>
            ) : query === "now_playing" ? (
              <h3>Ya en cines!</h3>
            ) : null}
            <Link to={`/series/${query}`}>
              <span>Ver M&aacute;s</span>
            </Link>
          </header>
          <div className="carousel__container">
            {movie.map((mov) => (
              <Link to={`/serie/${mov.id}`} key={mov.id}>
                <div className="carousel__item" >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
                    className="item-img"
                    alt="img-movies"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Series;
