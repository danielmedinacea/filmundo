import React, { useState, useEffect, useRef } from "react";
import "./menu.css";
import Logo from "./Filmundo.mp4";
import Not_Found from "./image-not-found.png";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Button,
} from "reactstrap";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listbox: {
    width: 200,
    margin: 0,
    padding: 0,
    zIndex: 10,
    position: "absolute",
    listStyle: "none",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 400,
    border: "1px solid rgba(0,0,0,.25)",
    '& li[data-focus="true"]': {
      backgroundColor: "#4a8df6",
      color: "white",
      cursor: "pointer",
    },
    "& li:active": {
      backgroundColor: "#2977f5",
      color: "white",
    },
  },
}));

const Menu = () => {
  const firstUpdate = useRef(true);
  const history = useHistory();
  const [inputBuscar, setInputBuscar] = useState("");
  const [moviesSearch, setMoviesSearch] = useState([]);
  useEffect(() => {
    const recoverData = JSON.parse(localStorage.getItem("userData"));
    if (!recoverData) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cambiarInput = (e) => {
    setInputBuscar(e.target.value);
  };
  const getMovies = async () => {
    const pelicula = inputBuscar;
    try {
      const respuesta = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=es&page=1&query=${pelicula}`
      );
      // console.log(respuesta.data.results);
      setMoviesSearch(respuesta.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (inputBuscar !== "") {
      getMovies();
    } else {
      setMoviesSearch([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputBuscar]);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const classes = useStyles();
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: moviesSearch,
    getOptionLabel: (option) => option.title,
  });

  const cerrarSesion = () => {
    localStorage.removeItem("userData");
    history.push("/");
  };

  return (
    <div>
      <Navbar className="navbar" expand="md">
        <NavbarBrand href="/main">
          <video autoPlay muted loop className="logo-menu">
            <source src={Logo} type="video/mp4" />
          </video>
          <span className="menu-titulo">FILMUNDO</span>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="botonMenuDesplegable" />
        <Collapse isOpen={isOpen} navbar>
          <div className="inputPrueba">
            <div>
              <div {...getRootProps()} className="d-inline col-12">
                <input
                  className={`buscadorInput`}
                  {...getInputProps()}
                  onChange={cambiarInput}
                  value={inputBuscar}
                />
              </div>
              {groupedOptions.length > 0 ? (
                <ul
                  className={` ul2 ${classes.listbox}`}
                  {...getListboxProps()}
                >
                  {groupedOptions.map((option, index) => (
                    <li
                      {...getOptionProps({ option, index })}
                      className={`elementoLista`}
                    >
                      <Link
                        onClick={() => {
                          window.location.href = `/film/${option.id}`;
                        }}
                        className="link-lista"
                      >
                        {option.poster_path === null ? (
                          <img
                            src={Not_Found}
                            alt={option.title}
                            className="fotoInput"
                          />
                        ) : (
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${option.poster_path}`}
                            alt={option.title}
                            className="fotoInput"
                          />
                        )}
                        <span>{option.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <Button
            className="lista-like"
            onClick={() => {
              window.location.href = `/filmlist`;
            }}
          >
            Ver Lista <i className="fa fa-heart icono-like"></i>
          </Button>
          <Button className="cerrarSesion" onClick={cerrarSesion}>
            Cerrar Sesión
          </Button>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Menu;
