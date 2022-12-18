import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const WatchProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/watch/providers/tv?api_key=01864e118c53cc6ab3c40e90d03443b0&language=es-ES&watch_region=AR",
    };
    setLoading(true);

    axios
      .request(options)
      .then(function (response) {
        setProviders(response.data.results);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  console.log(providers)

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="container bd-grid">
          <section className="carousel_providers">
            <h3>Explorá por servicios de streaming</h3>

            <div className="carousel__container_providers">
              {providers.map((prov) => (
                <div className="carousel__item_providers" key={prov.provider_id}>
                  <Link to={`/filterbyprovider/${prov.provider_id}`}>
                    <div className="carousel__card_providers">
                      <img src={`https://image.tmdb.org/t/p/w200/${prov.logo_path}`} />
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

export default WatchProviders;
