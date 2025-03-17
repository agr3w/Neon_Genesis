import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "./Carousel.css";
import { useRef } from "react";

const Carousel = () => {
  const swiperRef = useRef(null);

  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 7000 }}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        <SwiperSlide className="carousel-slide slide-1">Slide 1</SwiperSlide>
        <SwiperSlide className="carousel-slide slide-2">Slide 2</SwiperSlide>
        <SwiperSlide className="carousel-slide slide-3">Slide 3</SwiperSlide>
      </Swiper>

      {/* Botão de voltar */}
      <button
        className="carousel-button carousel-button-prev"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ArrowBackIos />
      </button>

      {/* Botão de avançar */}
      <button
        className="carousel-button carousel-button-next"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ArrowForwardIos />
      </button>
    </div>
  );
};

export default Carousel;
