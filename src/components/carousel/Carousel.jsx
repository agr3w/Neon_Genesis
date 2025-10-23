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
      height: { xs: '60vh', sm: '80vh', md: '100vh' },
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
        slidesPerView={1}
        touchRatio={1.2} 
        navigation={false} 
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
                height: { xs: '60vh', sm: '80vh', md: '100%' },
                minHeight: { xs: 300 },
                objectFit: 'cover',
                filter: 'brightness(0.8) contrast(1.2)'
              }}
            />
            <Box sx={{
              position: 'absolute',
              bottom: { xs: '8%', sm: '10%' },
              left: { xs: '5%', sm: '10%' },
              color: 'white',
              zIndex: 2,
              '&::before': {
                content: '"> "',
                color: theme.palette.nge.purple,
                marginRight: 1
              }
            }}>
              <Typography variant="h3" sx={{
                fontFamily: "'Orbitron', sans-serif",
                textShadow: `0 0 10px ${theme.palette.nge.purple}`,
                fontSize: { xs: '1.1rem', sm: '1.8rem', md: '2.8rem' },
                lineHeight: 1.1,
                maxWidth: { xs: '85%', sm: '60%', md: '50%' }
              }}>
                {image.title}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <NervCarouselButton
        sx={{
          left: '10px',
          display: { xs: 'none', sm: 'flex' }, // Oculta no mobile
          p: { xs: 0.5, sm: 1.25 },
          minWidth: { xs: 32, sm: 40 },
          minHeight: { xs: 32, sm: 40 }
        }}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ArrowBackIos fontSize="small" />
      </NervCarouselButton>

      <NervCarouselButton
        sx={{
          right: '10px',
          display: { xs: 'none', sm: 'flex' }, // Oculta no mobile
          p: { xs: 0.5, sm: 1.25 },
          minWidth: { xs: 32, sm: 40 },
          minHeight: { xs: 32, sm: 40 }
        }}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ArrowForwardIos fontSize="small" />
      </NervCarouselButton>
    </Box>
  );
};

export default Carousel;