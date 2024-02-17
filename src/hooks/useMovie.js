import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";

export const useMovie = (id, query, multi) => {
  const location = useLocation();
  const [movData, setMovData] = useState([]);
  const [movCredits, setMovCredits] = useState([]);
  const [movSimilar, setMovSimilar] = useState([]);
  const [movWatchProv, setMovWatchProv] = useState([]);
  const [movTrailers, setMovTrailers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [movie, setMovie] = useState([]);

  const movieByQuery = (query) => {
    if(!id) {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${multi}/${query}?api_key=01864e118c53cc6ab3c40e90d03443b0&language=en-US&page=1`,
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
    }
  };

  const movieData = () => {
    if(id) {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${multi}/${id}?api_key=01864e118c53cc6ab3c40e90d03443b0&language=es-ES`,
      };
      setLoading(true);
      axios
        .request(options)
        .then(function (response) {
          setMovData(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  const movieCredits = () => {
    if(id) {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${multi}/${id}/credits?api_key=01864e118c53cc6ab3c40e90d03443b0&language=es-ES`,
      };
      setLoading(true);
      axios
        .request(options)
        .then(function (response) {
          setMovCredits(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  const movieSimilar = () => {
    if(id) {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${multi}/${id}/similar?api_key=01864e118c53cc6ab3c40e90d03443b0&language=es-ES`,
      };
      setLoading(true);
      axios
        .request(options)
        .then(function (response) {
          setMovSimilar(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  const movieWatchProv = () => {
    if(id) {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${multi}/${id}/watch/providers?api_key=01864e118c53cc6ab3c40e90d03443b0&language=es-ES`,
      };
      setLoading(true);
      axios
        .request(options)
        .then(function (response) {
          setMovWatchProv(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  const movieTrailers = () => {
    if(id) {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${multi}/${id}/videos?api_key=01864e118c53cc6ab3c40e90d03443b0&language=es-ES`,
      };
      setLoading(true);
      axios
        .request(options)
        .then(function (response) {
          setMovTrailers(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  const watchProvAR = movWatchProv.results?.AR;

  let Duration = (movData?.runtime * 1) / 60;
  const MovieDuration = Duration.toString().slice(0, 4);

  useEffect(() => {
    const newId = location.state?.id;
    if (newId) {
      window.location.reload(true);
    }

    movieByQuery(query);
    movieData();
    movieCredits();
    movieSimilar();
    movieWatchProv();
    movieTrailers();
  }, [location]);

  return {
    movData,
    movCredits,
    movSimilar,
    movWatchProv,
    movTrailers,
    loading,
    watchProvAR,
    MovieDuration,
    movie,
    setMovie,
  };
};
