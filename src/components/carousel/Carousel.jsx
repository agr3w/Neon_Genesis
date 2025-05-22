import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useTheme } from '@mui/material/styles';
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import carouselData from "../../data/carouselData";
import { NervCarouselButton } from "../../styles/theme";

const Carousel = () => {
  const swiperRef = useRef(null);
  const theme = useTheme();

  return (
    <Box sx={{
      position: 'relative',
      height: '100vh',
      '& .swiper-slide': {
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(0deg, rgba(0, 255, 157, 0.1) 0%, transparent 50%)'
        }
      }
    }}>
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 7000 }}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        style={{
          height: '100%',
          background: 'linear-gradient(45deg, var(--nge-dark) 0%, #1a1a2e 100%)'
        }}
      >
        {carouselData.map((image, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              src={image.src}
              alt={image.alt}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.8) contrast(1.2)'
              }}
            />
            <Box sx={{
              position: 'absolute',
              bottom: '10%',
              left: '10%',
              color: 'white',
              zIndex: 2,
              '&::before': {
                content: '"> "',
                color: theme.palette.nge.purple
              }
            }}>
              <Typography variant="h3" sx={{
                fontFamily: "'Orbitron', sans-serif",
                textShadow: `0 0 10px ${theme.palette.nge.purple}`
              }}>
                {image.title}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <NervCarouselButton
        sx={{ left: '30px' }}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ArrowBackIos />
      </NervCarouselButton>

      <NervCarouselButton
        sx={{ right: '30px' }}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ArrowForwardIos />
      </NervCarouselButton>
    </Box>
  );
};

export default Carousel;