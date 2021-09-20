import React, { useEffect, useState } from "react";
import "./tendencia.css";
import axios from "axios";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow";
import "swiper/components/pagination/pagination.min.css";

// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

const Tendencia = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const getTrendingMovies = async () => {
    try {
      const respuesta = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=es&sort_by=popularity.desc&page=1`
      );
      //   console.log(respuesta.data.results);
      setTrendingMovies(respuesta.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrendingMovies();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="tendencia">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        // pagination={true}
        className="mySwiper"
      >
        {trendingMovies.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <Link to={`/film/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.id}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Tendencia;
