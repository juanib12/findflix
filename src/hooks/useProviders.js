import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";

export const useProviders = (id) => {
  const location = useLocation();

  const [pelis, setPelis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listProv, setListProv] = useState([]);

  const filterProvider = (id) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=01864e118c53cc6ab3c40e90d03443b0&language=en-US&page=1&with_watch_providers=${id}&watch_region=AR`,
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

  useEffect(() => {
    const newId = location.state?.id;
    if (newId) {
      window.location.reload(true);
    }
    filterProvider(id);
    listaProviders();
  }, [location]);


  return {
    pelis,
    loading,
    listProv,
    filterProvider,
    listaProviders,
  };
};
