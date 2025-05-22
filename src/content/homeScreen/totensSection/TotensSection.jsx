import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { useNavigate } from "react-router-dom";
import totensData from "../../../data/totemData";
import { Typography, Box, styled } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { NervCarouselButton, NervTotemCard } from "../../../styles/theme";

const TotensSection = () => {
  const swiperRef = useRef(null);
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{
      py: 8,
      background: `linear-gradient(180deg, #1a1a2e 0%, #0a0a12 100%)`,
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 1px,
          rgba(0, 255, 157, 0.05) 1px,
          rgba(0, 255, 157, 0.05) 2px
        )`
      }
    }}>
      <Typography variant="h3" sx={{
        textAlign: 'center',
        mb: 6,
        fontFamily: "'Orbitron', sans-serif",
        color: theme.palette.nge.neonGreen,
        textTransform: 'uppercase',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100px',
          height: '3px',
          background: theme.palette.nge.red
        }
      }}>
        /// NOSSOS TOTENS
      </Typography>

      <Box sx={{ px: 2 }}>
        <Swiper
          modules={[Navigation, EffectCoverflow]}
          effect="coverflow"
          centeredSlides
          loop
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 10,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 3 }
          }}
        >
          {totensData.map((item) => (
            <SwiperSlide key={item.id}>
              <NervTotemCard onClick={() => navigate(`/totem/${item.id}`)}>
                <Box component="img"
                  src={item.image}
                  sx={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'contain',
                    mb: 2,
                    filter: 'drop-shadow(0 0 5px rgba(0, 255, 157, 0.5))'
                  }}
                />
                <Typography variant="h5" sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: 'white',
                  mb: 1,
                  transition: 'color 0.3s'
                }}>
                  {item.name}
                </Typography>
                <Typography variant="body1" sx={{
                  color: theme.palette.nge.neonGreen,
                  fontFamily: "'Rajdhani', sans-serif"
                }}>
                  {item.description}
                </Typography>
              </NervTotemCard>
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
    </Box>
  );
};

export default TotensSection;