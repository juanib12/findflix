import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

const MoviesByGenre = () => {
  const location = useLocation();
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  const moviesbygenre = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=01864e118c53cc6ab3c40e90d03443b0&language=en-US&with_genres=${id}`,
    };
    setLoading(true);
    axios
      .request(options)
      .then((res) => {
        setMovie(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const newId = location.state?.id;
    if (newId) {
      window.location.reload(true);
    }
    moviesbygenre();
  }, [location]);

  return (
    <>
      <Header />
      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="container bd-grid">
          <div className="container__center">
            {movie.map((mov) => (
              <Link to={`/producto/${mov.id}`}>
                <div key={mov.id} className="container__center-img">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
                    className="item-img"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MoviesByGenre;
