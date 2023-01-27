import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";

export const useGenres = (id) => {
  const location = useLocation();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState([]);

  const moviesbygenre = (id) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=01864e118c53cc6ab3c40e90d03443b0&language=en-US&with_genres=${id}&page=1`,
    };
    setLoading(true);
    axios
      .request(options)
      .then((res) => {
        setMovie(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const listaGenres = () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/genre/movie/list?api_key=01864e118c53cc6ab3c40e90d03443b0&language=es-ES",
    };
    setLoading(true);

    axios
      .request(options)
      .then(function (response) {
        setGenres(response.data.genres);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const GenreFilterById = genres.filter((x) => x.id == id);

  useEffect(() => {
    const newId = location.state?.id;
    if (newId) {
      window.location.reload(true);
    }
    moviesbygenre(id);
    listaGenres();
  }, [location]);

  return { genres, loading, movie, moviesbygenre, listaGenres, GenreFilterById };
};
