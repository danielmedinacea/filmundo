import React, { useEffect, useState } from "react";
import "./film.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import Iframe from "react-iframe";
import { useHistory } from "react-router-dom";

const Film = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [movieVideo, setMovieVideo] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [idUsuario, setIdUsuario] = useState();
  const [meGusta, setMeGusta] = useState(false);
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

  const getMoviesLike = async () => {
    if (idUsuario) {
      try {
        const respuesta = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}proyecto/user/${idUsuario}`
        );
        if (respuesta.data.usuario.filmlist.films.includes(id)) {
          setMeGusta(true);
        } else {
          setMeGusta(false);
        }
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

  const getMovieVideo = async () => {
    try {
      const respuesta = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=es`
      );
      setMovieVideo(respuesta.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getFechaModificada = (fecha) => {
    const array = fecha.split("-");
    return `${array[2]}-${array[1]}-${array[0]}`;
  };

  const getGenerosModificados = (generos) => {
    let generosModificados = "";
    generos.forEach((element) => {
      generosModificados += element.name + ", ";
    });
    return generosModificados.substring(0, generosModificados.length - 2);
  };

  const getDuracionModificada = (duracion) => {
    var hour = Math.floor(duracion / 60);
    var minute = Math.floor(duracion % 60);
    return `${hour}h ${minute}m`;
  };

  const getColorValoracion = (valoracion) => {
    if (valoracion <= 45) {
      return "red";
    } else if (valoracion <= 70) {
      return "yellow";
    } else {
      return "green";
    }
  };

  const getMovieDetails = async () => {
    setLoading(true);
    try {
      const respuesta = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=es`
      );
      setMovieDetails(respuesta.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMovieVideo();
    return function cleanup() {
      setLoading(false);
    };
    // eslint-disable-next-line
  }, [idUsuario]);
  useEffect(() => {
    getMovieDetails();
    return function cleanup() {
      setLoading(false);
    };
    // eslint-disable-next-line
  }, [idUsuario]);

  const añadirPelicula = async () => {
    setMeGusta(true);
    try {
      const respuesta = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}proyecto/user/${idUsuario}`
      );

      try {
        const recoverData = await JSON.parse(localStorage.getItem("userData"));
        const token = recoverData.token;
        await axios.patch(
          `${process.env.REACT_APP_BACKEND_URL}proyecto/user/addFilm/${respuesta.data.usuario.filmlist._id}`,
          {
            filmId: `${id}`,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const quitarPelicula = async () => {
    setMeGusta(false);
    try {
      const respuesta = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}proyecto/user/${idUsuario}`
      );

      try {
        const recoverData = await JSON.parse(localStorage.getItem("userData"));
        const token = recoverData.token;
        await axios.patch(
          `${process.env.REACT_APP_BACKEND_URL}proyecto/user/deleteFilm/${respuesta.data.usuario.filmlist._id}`,
          {
            filmId: `${id}`,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      } catch (err) {
        console.log(err + "fallo id filmId");
      }
    } catch (error) {
      console.log(error + "error usuario");
    }
  };

  var sectionStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`,
  };

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div className="container-fluid p-0">
      {loading ? (
        <div>CARGANDO DATOS...</div>
      ) : (
        <div className="row film" style={sectionStyle}>
          <div className="filmFondo row pt-4 pb-4">
            <div className="col-md-5 block1">
              <img
                src={`https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`}
                alt=""
                className="portada"
                id="portadaMovieDetails"
              />
            </div>
            <div className="col-md-7 block2 ">
              <div className="texto-movie">
                <div className="titulo col-sm-12">
                  <h1>{movieDetails.title}</h1>
                </div>
                <div className="extraInfo col-sm-12">
                  <p>
                    <span>{getFechaModificada(movieDetails.release_date)}</span>
                    <span>{getGenerosModificados(movieDetails.genres)}</span>
                    <span>{getDuracionModificada(movieDetails.runtime)}</span>
                  </p>
                </div>
                <div className="multimedia col-sm-12">
                  <div className="circulo-valoracion-pelicula">
                    <CircularProgressbar
                      value={movieDetails.vote_average * 10}
                      text={`${movieDetails.vote_average * 10}%`}
                      background
                      backgroundPadding={6}
                      styles={buildStyles({
                        backgroundColor: "#0b010c",
                        textColor: "#66fcf1",
                        pathColor: `${getColorValoracion(
                          movieDetails.vote_average * 10
                        )}`,
                        trailColor: "transparent",
                      })}
                    />
                  </div>
                  <span>Valoración</span>
                </div>
                <div className="col-sm-8" id="sinopsis">
                  <h3>Sinopsis</h3>
                  <p>{movieDetails.overview}</p>
                </div>
                {meGusta ? (
                  <Button className="lista-like" onClick={quitarPelicula}>
                    Quitar de la Lista{" "}
                    <i className="fa fa-heart icono-like"></i>
                  </Button>
                ) : (
                  <Button className="lista-like" onClick={añadirPelicula}>
                    Añadir Lista <i className="fa fa-heart icono-like"></i>
                  </Button>
                )}

                {movieVideo.length !== 0 ? (
                  <div className="boton-reproducir">
                    <Button className="lista-like" onClick={toggle}>
                      Reproducir <i className="fa fa-play icono-like"></i>
                    </Button>
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle}></ModalHeader>
                      <ModalBody>
                        <Iframe
                          url={`https://www.youtube.com/embed/${movieVideo[0].key}`}
                          width="100%"
                          height="400px"
                          display="initial"
                          position="relative"
                        />
                      </ModalBody>
                    </Modal>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Film;
