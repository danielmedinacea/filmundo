import React from "react";
import "./submenu.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-scroll";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

// import "./css.css";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);
SwiperCore.use([Autoplay]);
const Submenu = () => {
  const generos = [
    {
      name: "Acción",
      link: "https://img.icons8.com/ios/50/000000/action.png",
    },
    {
      name: "Aventura",
      link: "https://img.icons8.com/ios/50/000000/adventure.png",
    },
    {
      name: "Animación",
      link: "https://img.icons8.com/ios/50/000000/animation.png",
    },
    {
      name: "Comedia",
      link: "https://img.icons8.com/ios/50/000000/comedy2.png",
    },
    {
      name: "Crimen",
      link: "https://img.icons8.com/ios/50/000000/crime.png",
    },
    {
      name: "Documental",
      link: "https://img.icons8.com/ios/50/000000/documentary.png",
    },
    {
      name: "Drama",
      link: "https://img.icons8.com/ios/50/000000/drama.png",
    },
    {
      name: "Familia",
      link: "https://img.icons8.com/ios/50/000000/family--v1.png",
    },
    {
      name: "Fantasía",
      link: "https://img.icons8.com/ios/50/000000/fantasy.png",
    },
    {
      name: "Historia",
      link: "https://img.icons8.com/ios/50/000000/doctor-fate-helmet.png",
    },
    {
      name: "Terror",
      link: "https://img.icons8.com/ios/50/000000/horror.png",
    },
    {
      name: "Música",
      link: "https://img.icons8.com/ios/50/000000/musical.png",
    },
    {
      name: "Misterio",
      link: "https://img.icons8.com/ios/50/000000/hacker.png",
    },
    {
      name: "Romance",
      link: "https://img.icons8.com/ios/50/000000/novel--v2.png",
    },
    {
      name: "Sci-Fi",
      link: "https://img.icons8.com/ios/50/000000/sci-fi.png",
    },
    {
      name: "Tv Movie   ",
      link: "https://img.icons8.com/ios/50/000000/tv.png",
    },
    {
      name: "Suspense",
      link: "https://img.icons8.com/ios/50/000000/film-noir.png",
    },
    {
      name: "Bélica",
      link: "https://img.icons8.com/ios/50/000000/tank.png",
    },
    {
      name: "Western",
      link: "https://img.icons8.com/ios/50/000000/country-music.png",
    },
  ];

  return (
    <div className="submenu">
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 3,
          },
          570: {
            slidesPerView: 4,
            //   spaceBetween: 30,
          },
          // when window width is >= 640px
          870: {
            slidesPerView: 7,
            //   spaceBetween: 30,
          },
        }}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        autoplay={{
          delay: 2000,
        }}
      >
        {generos.map((e) => {
          return (
            <SwiperSlide key={e.name}>
              <Link
                to={e.name}
                activeClass="active"
                spy={true}
                smooth={true}
                duration={500}
                className="enlace-genero"
              >
                <img src={e.link} alt={e.name} className="genero" />
                {e.name}
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Submenu;
