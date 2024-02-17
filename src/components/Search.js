import axios from "axios";
import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import Generos from "./Generos";
import Footer from "./Footer";

const Search = () => {
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const searchMovie = (e) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/search/multi?api_key=01864e118c53cc6ab3c40e90d03443b0&language=en-US&query=${query}&page=1`,
    };
    setLoading(true);
    axios
      .request(options)
      .then((res) => {
        setSearch(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header isSearch={true}/>
      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="container bd-grid">
          <form onSubmit={searchMovie}>
            <div className="container-search">
              <input
                placeholder="Buscar"
                className="search"
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="icon-search-2">
                <i className="bx bx-search icon"></i>
              </div>
            </div>
          </form>

          {search?.length === 0 ? (
            <Generos/>
          ) : (
            <div className="container__center">
              {search.map((mov) => (
                <Link to={`/producto/${mov.id}/${mov.media_type}`} key={mov.id}>
                  <div className="container__center-img">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
                      className="pelis_img"
                      alt="img-movies"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Search;
