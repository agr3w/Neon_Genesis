import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "./Carousel.css";
import { useRef } from "react";
import test from "../../assets/restaurantes_totem_slide.jpg"
import test2 from "../../assets/novos_lancamentos.jpg"


const images = [
  {
    src: test,
    alt: "Totem 1"
  },
  {
    src: test2,
    alt: "Totem 2"
  },
  // Adicione quantos cards precisar
];


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
        {images.map((image, index) => (
          <SwiperSlide key={index} className="carousel-slide">
            <img 
              src={image.src} 
              alt={image.alt} 
              className="carousel-image"
            />
          </SwiperSlide>
        ))}
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
