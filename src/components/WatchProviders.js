import { Link } from "react-router-dom";
import { useProviders } from "../hooks/useProviders";

const WatchProviders = () => {
  const { listProv, loading } = useProviders();

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="container bd-grid providers">
          <h3>Explorá por servicios de streaming</h3>
          <section className="carousel_providers">
            <div className="carousel__container_providers">
              {listProv.map((prov) => (
                <div
                  className="carousel__item_providers"
                  key={prov.provider_id}
                >
                  <Link to={`/filterbyprovider/${prov.provider_id}`}>
                    <div className="carousel__card_providers">
                      <img
                        src={`https://image.tmdb.org/t/p/w200/${prov.logo_path}`}
                      />
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
