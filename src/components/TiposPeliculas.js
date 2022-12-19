import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";

const TiposPeliculas = () => {
  const location = useLocation();
  const { id } = useParams();

  const [currenPage, setCurrenPage] = useState(1);
  const [pelis, setPelis] = useState([]);
  const [loading, setLoading] = useState(false);

  const tiposPelis = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}?api_key=01864e118c53cc6ab3c40e90d03443b0&language=en-US&page=${currenPage}`,
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

  useEffect(() => {
    const newId = location.state?.id;
    if (newId) {
      window.location.reload(true);
    }
    tiposPelis();
  }, [location]);

  console.log(currenPage);

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

export default TiposPeliculas;
