import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useProviders } from "../hooks/useProviders";

const FilterByProvider = () => {
  const { id } = useParams();

  const { pelis, loading, listProv, filterProvider, listaProviders } =
    useProviders(id);

  const ProvFilterById = listProv.filter((x) => x.provider_id == id);

  return (
    <>
      <Header />
      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="container bd-grid">
          {ProvFilterById.map((x) => (
            <h2 key={x.provider_id}>{x.provider_name}</h2>
          ))}
          <div className="container__center">
            {pelis.map((mov) => (
              <Link to={`/producto/${mov.id}`} key={mov.id}>
                <div className="container__center-img">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
                    className="pelis_img"
                  />
                </div>
              </Link>
            ))}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default FilterByProvider;
