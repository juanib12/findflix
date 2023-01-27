import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useGenres } from "../hooks/useGenres";

const Generos = () => {

  const {genres, loading} = useGenres()

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
