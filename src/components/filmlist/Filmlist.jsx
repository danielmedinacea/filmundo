import React, { useState, useEffect } from "react";
import axios from "axios";
import "./filmlist.css";
import { Link, useHistory } from "react-router-dom";

const Filmlist = () => {
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const [idUsuario, setIdUsuario] = useState();
  useEffect(() => {
    const recoverData = JSON.parse(localStorage.getItem("userData"));
    if (!recoverData) {
      history.push("/");
    } else {
      setIdUsuario(recoverData.userData);
    }
    return function cleanup() {
      setLoading(false);
    };
    // eslint-disable-next-line
  }, []);

  const [peliculasLike, setPeliculasLike] = useState([]);

  const [idPeliculasLike, setIdPeliculasLike] = useState([]);

  const getMoviesLike = async () => {
    if (idUsuario) {
      try {
        const respuesta = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}proyecto/user/${idUsuario}`
        );
        setIdPeliculasLike(respuesta.data.usuario.filmlist.films);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getMoviesLike();
    return function cleanup() {
      setLoading(false);
    };
    // eslint-disable-next-line
  }, [idUsuario]);

  const getMoviesImprimir = async () => {
    setLoading(true);
    try {
      const arrayMovies = await Promise.all(
        idPeliculasLike.map(async (id) => {
          const respuesta = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=es`
          );
          return respuesta.data;
        })
      );
      setPeliculasLike(arrayMovies);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMoviesImprimir();
    return function cleanup() {
      setLoading(false);
    };
    // eslint-disable-next-line
  }, [idPeliculasLike]);

  return (
    <div className="container p-0 filmlist mt-3">
      {loading ? (
        <div>CARGANDO DATOS...</div>
      ) : (
        <div className="row">
          {peliculasLike.map((movie) => {
            return (
              <div className="col-4 col-lg-2 mt-2" key={movie.id}>
                <Link to={`/film/${movie.id}`} className="link-lista">
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                    alt=""
                    className="cartel"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Filmlist;
