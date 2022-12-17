import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Generos = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/genre/movie/list?api_key=01864e118c53cc6ab3c40e90d03443b0&language=es-ES",
    };
    setLoading(true);

    axios
      .request(options)
      .then(function (response) {
        setGenres(response.data.genres);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="container bd-grid">
          <section className="carousel_genres">
            <h3>Explorá por géneros</h3>

            <div className="carousel__container_genres">
              {genres.map((genero) => (
                <div className="carousel__item_genres" key={genero.id}>
                  <Link to={`/movies_by_genre/${genero.id}`}>
                  <div className="carousel__card_genres">
                    <h2>{genero.name}</h2>
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Generos;
