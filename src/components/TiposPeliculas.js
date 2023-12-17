import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useMovie } from "../hooks/useMovie";

const TiposPeliculas = () => {
  const { id } = useParams();
  const { movie, loading } = useMovie(null, id, "movie");

  return (
    <>
      <Header />
      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="container bd-grid">
          {id === "popular" ? (
            <h3>Las más vistas</h3>
          ) : id === "top_rated" ? (
            <h3>Las más valoradas</h3>
          ) : id === "upcoming" ? (
            <h3>Proximamente</h3>
          ) : null}
          <div className="filter-container"></div>
          <ul className="container__center">
            {movie.map((mov) => (
              <li key={mov.id}>
                <Link to={`/producto/${mov.id}`}>
                  <div className="container__center-img">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
                      className="pelis_img"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Footer />
        </div>
      )}
    </>
  );
};

export default TiposPeliculas;
