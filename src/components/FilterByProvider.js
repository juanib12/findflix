import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";

const FilterByProvider = () => {
  const location = useLocation();
  const { id } = useParams();

  const [pelis, setPelis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listProv, setListProv] = useState([])

  let currenPage = 1;

  const filterProvider = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=01864e118c53cc6ab3c40e90d03443b0&language=en-US&page=${currenPage}&with_watch_providers=${id}&watch_region=AR`,
    };
    setLoading(true);
    axios
      .request(options)
      .then((res) => {
        setPelis(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const listaProviders = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/watch/providers/movie?api_key=01864e118c53cc6ab3c40e90d03443b0&language=es-ES&watch_region=AR`,
    };
    axios
      .request(options)
      .then((res) => {
        setListProv(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ProvFilterById = listProv.filter((x) => x.provider_id == id);


  console.log(ProvFilterById)



  useEffect(() => {
    const newId = location.state?.id;
    if (newId) {
      window.location.reload(true);
    }
    filterProvider();
    listaProviders()
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
          {ProvFilterById.map((x) => (
            <h2 key={x.provider_id}>{x.provider_name}</h2>
          ))}
          <div className="container__center">
            {pelis.map((mov) => (
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
          <Footer />
        </div>
      )}
    </>
  );
};

export default FilterByProvider;
