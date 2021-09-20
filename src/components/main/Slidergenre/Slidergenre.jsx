import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import "./slidergenre.css";

import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper/core";

SwiperCore.use([Pagination, Navigation]);
SwiperCore.use([Autoplay]);

const Slidergenre = (props) => {
  const nameGenre = props.nameGenre;
  const idGenre = props.idGenre;

  const [arrayMovies, setArrayMovies] = useState([]);
  const getMoviesByGenre = async () => {
    try {
      const respuesta = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=es&sort_by=popularity.desc&page=1&with_genres=${idGenre}`
      );
      setArrayMovies(respuesta.data.results);
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    getMoviesByGenre();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="genreSlider">
      <h2 id={nameGenre}>{nameGenre}</h2>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 8,
            spaceBetween: 15,
          },
          1440: {
            slidesPerView: 9,
            spaceBetween: 20,
          },
        }}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        className="mySwiper"
      >
        {arrayMovies.map((movie) => {
          const valoracion = movie.vote_average * 10;
          const colorValoracion = getColorValoracion(valoracion);
          return (
            <SwiperSlide key={movie.id}>
              <div className="flip-card">
                <Link to={`/film/${movie.id}`}>
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </div>
                    <div className="flip-card-back">
                      <p>{movie.title}</p>
                      <p>{movie.release_date}</p>
                      <div className="circulo-valoracion">
                        <CircularProgressbar
                          value={valoracion}
                          text={`${valoracion}%`}
                          background
                          backgroundPadding={6}
                          styles={buildStyles({
                            backgroundColor: "#0b010c",
                            textColor: "#66fcf1",
                            pathColor: `${colorValoracion}`,
                            trailColor: "transparent",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slidergenre;
