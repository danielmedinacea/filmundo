import React, { useEffect, useState } from "react";
import "./main.css";
import Slidergenre from "./Slidergenre/Slidergenre";
import { useHistory } from "react-router-dom";
import Tendencia from "../tendencia/Tendencia";

const arrayGenre = [
  { id: 28, name: "Acción" },
  { id: 12, name: "Aventura" },
  { id: 16, name: "Animación" },
  { id: 35, name: "Comedia" },
  { id: 80, name: "Crimen" },
  { id: 99, name: "Documental" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Familia" },
  { id: 14, name: "Fantasía" },
  { id: 36, name: "Historia" },
  { id: 27, name: "Terror" },
  { id: 10402, name: "Música" },
  { id: 9648, name: "Misterio" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Ciencia ficción" },
  { id: 10770, name: "Película de TV" },
  { id: 53, name: "Suspense" },
  { id: 10752, name: "Bélica" },
  { id: 37, name: "Western" },
];

const Main = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoverData = JSON.parse(localStorage.getItem("userData"));
    if (!recoverData) {
      history.push("/");
    } else {
      setLoading(false);
    }
    return function cleanup() {
      setLoading(true);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className="main">
      {loading ? (
        <div>CARGANDO DATOS...</div>
      ) : (
        <div>
          <Tendencia />
          {arrayGenre.map((genero) => {
            return (
              <Slidergenre
                key={genero.id}
                nameGenre={genero.name}
                idGenre={genero.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Main;
