import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Series = ({ query }) => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/${query}?api_key=01864e118c53cc6ab3c40e90d03443b0&language=en-US&page=1`,
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
  }, []);

  return (
    <section className="carousel">
      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="carousel__container">
          {query === "popular" ? (
            <h3>Series más vistas</h3>
          ) : query === "top_rated" ? (
            <h3>Series más valoradas</h3>
          ) : query === "upcoming" ? (
            <h3>Proximamente en Series</h3>
          ) : null}
          {movie.map((mov) => (
            <Link to={`/producto/${mov.id}`}>
              <div className="carousel__item" key={mov.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
                  className="item-img"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Series;
