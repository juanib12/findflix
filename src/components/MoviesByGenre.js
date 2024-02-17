import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useGenres } from "../hooks/useGenres";

const MoviesByGenre = () => {
  const { id } = useParams();
  const { genres, loading, movie, moviesbygenre, GenreFilterById } =
    useGenres(id);

  return (
    <>
      <Header />
      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="container bd-grid">
          {GenreFilterById.map((x) => (
            <h2 key={x.id}>{x.name}</h2>
          ))}
          <ul className="container__center">
            {movie.map((mov) => (
              <li key={mov.id}>
                <Link to={`/producto/${mov.id}`}>
                  <div className="container__center-img">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
                      className="pelis_img"
                      alt="img-movies"
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

export default MoviesByGenre;
