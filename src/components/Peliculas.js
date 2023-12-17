import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMovie } from "../hooks/useMovie";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";

const Peliculas = ({ query, data_top }) => {
  const { movie, loading } = useMovie(null, query, "movie");

  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "movie" }));
    }
  }, [genresLoaded]);

  const moviesTop = movie.slice(0, 10);

  return (
    <section className="carousel">
      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <header className="carousel_header">
            {query === "popular" ? (
              <h3>Las más vistas</h3>
            ) : query === "top_rated" ? (
              <h3>Las más valoradas</h3>
            ) : query === "upcoming" ? (
              <h3>Proximamente</h3>
            ) : query === "now_playing" ? (
              <h3>Ya en cines!</h3>
            ) : null}
            <Link to={`/peliculas/${query}`}>
              <span>Ver M&aacute;s</span>
            </Link>
          </header>

          <div className="carousel__container">
          {!data_top && movie.map((mov) => (
            <Link to={`/producto/${mov.id}`} key={mov.id}>
              <div className="carousel__item" >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
                  className="item-img"
                />
              </div>
            </Link>
          ))}
          {data_top && moviesTop.map((mov, idx) => (
            <Link to={`/producto/${mov.id}`} key={mov.id}>
              <div className="carousel__item" data-top={idx + 1}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
                  className="item-img"
                />
              </div>
            </Link>
          ))}
        </div>
        </>
      )}
    </section>
  );
};

export default Peliculas;