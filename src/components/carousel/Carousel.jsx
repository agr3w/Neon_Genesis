import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "./Carousel.css";
import { useRef } from "react";
import carouselData from "../../data/carouselData";

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
        {carouselData.map((image, index) => (
          <SwiperSlide key={index} className="carousel-slide">
            <img src={image.src} alt={image.alt} className="carousel-image" />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className="carousel-button carousel-button-prev"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ArrowBackIos />
      </button>

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