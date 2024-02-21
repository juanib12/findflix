import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from "react";

import { useMovie } from "../hooks/useMovie";
import { useGenres } from "../hooks/useGenres";

const TiposPeliculas = () => {
  const { id } = useParams();
  const { genres } = useGenres();
  const [moviesFiltered, setMoviesFiltered] = useState([]);
  const { movie, loading } = useMovie(null, id, "movie");
  const years = [];
  
  const handleOnChange = (value, type) => {
    let filter = [];

    if(type === 'genres') {
      console.log('genres', value)
      filter = movie.filter(function(doc) {
        return doc.genre_ids.find(function(_doc) {
          return _doc == value;
        })
      })
    }

    if(type === 'date') {
      console.log('date', value)
      filter = movie.filter(function(_doc) {
        return new Date(_doc.release_date).getFullYear() == value;
      })
    }

    if(!value) {
      console.log("entra")
      setMoviesFiltered(movie);
    }
  
    setMoviesFiltered(filter);
  }
 
  useEffect(() => {
    setMoviesFiltered(movie)
  }, [movie])

  movie.forEach(function(row, idx) {
    years.push({ year: new Date(row.release_date).getFullYear(), id: idx })
  })

  years.sort((a, b) => a.year - b.year);
  
  return (
    <>
      <Header />
      <section className="filtros container bd-grid">
        <span>Filtros</span>
        <ul>
          <li> 
            <select onChange={(e) => {handleOnChange(e.target.value, 'genres')}}>
              <option value="">G&eacute;nero</option> 
            {genres.map((genero) => (
              <option key={genero.id} value={genero.id}>{genero.name}</option> 
            ))}
            </select>
          </li>    
          <li> 
            <select onChange={(e) => {handleOnChange(e.target.value, 'date')}}>
              <option value="">Año de estreno</option> 
            {years.map((_year) => (
              <option key={_year.idx} value={_year.year}>{_year.year}</option> 
            ))}
            </select>
          </li>  
        </ul>
      </section>
      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="bd-grid">
          {id === "popular" ? (
            <h3>Las más vistas</h3>
          ) : id === "top_rated" ? (
            <h3>Las más valoradas</h3>
          ) : id === "upcoming" ? (
            <h3>Proximamente</h3>
          ) : null}
          <div className="filter-container"></div>
          <ul className="container__center">
            {moviesFiltered.map((mov) => (
              <li key={mov.id}>
                <Link to={`/producto/${mov.id}/movie`}>
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

export default TiposPeliculas;
