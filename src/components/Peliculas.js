import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMovie } from "../hooks/useMovie";

const Peliculas = ({ query }) => {
  const { movie, loading } = useMovie(null, query, "movie");

  return (
    <section className="carousel">
      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="carousel__container">
          {query === "popular" ? (
            <h3>Las más vistas</h3>
          ) : query === "top_rated" ? (
            <h3>Las más valoradas</h3>
          ) : query === "upcoming" ? (
            <h3>Proximamente</h3>
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

export default Peliculas;
