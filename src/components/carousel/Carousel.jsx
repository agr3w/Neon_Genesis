import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useTheme } from '@mui/material/styles';
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useRef } from "react";
import { Box, styled, Typography } from "@mui/material";
import carouselData from "../../data/carouselData";

const NervCarouselButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  zIndex: 10,
  width: '50px',
  height: '50px',
  transform: 'translateY(-50%)',
  background: 'rgba(10, 10, 18, 0.7)',
  border: `2px solid ${theme.palette.nge.neonGreen}`,
  borderRadius: '50%',
  color: theme.palette.nge.neonGreen,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    background: theme.palette.nge.red,
    color: theme.palette.nge.dark,
    boxShadow: `0 0 15px ${theme.palette.nge.neonGreen}`
  }
}));

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