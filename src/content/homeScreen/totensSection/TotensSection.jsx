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

      <Box sx={{ px: { xs: 0.5, sm: 2 } }}>
        <Swiper
          modules={[Navigation, EffectCoverflow]}
          effect="coverflow"
          loop
          centeredSlides={false}
          slidesPerView={1}
          navigation={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          coverflowEffect={{
            rotate: 10,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false
          }}
          breakpoints={{
            0: { slidesPerView: 1, centeredSlides: false },
            640: { slidesPerView: 2, centeredSlides: false },
            1024: { slidesPerView: 3, centeredSlides: true }
          }}
        >
          {totensData.map((item) => (
            <SwiperSlide key={item.id}>
              <NervTotemCard
                onClick={() => navigate(`/totem/${item.id}`)}
                sx={{
                  margin: { xs: '8px', sm: '20px' },
                  padding: { xs: 1, sm: 3 }
                }}
              >
                <Box component="img"
                  src={item.image}
                  sx={{
                    width: '100%',
                    height: { xs: '140px', sm: '200px' },
                    objectFit: 'contain',
                    mb: 2,
                    filter: 'drop-shadow(0 0 5px rgba(0, 255, 157, 0.5))'
                  }}
                />
                <Typography variant="h6" sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: 'white',
                  mb: 1,
                  fontSize: { xs: '1rem', sm: '1.3rem' }
                }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{
                  color: theme.palette.nge.neonGreen,
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}>
                  {item.description}
                </Typography>
              </NervTotemCard>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botões só aparecem em telas maiores */}
        <NervCarouselButton
          sx={{ left: '10px', display: { xs: 'none', sm: 'flex' } }}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ArrowBackIos />
        </NervCarouselButton>

        <NervCarouselButton
          sx={{ right: '10px', display: { xs: 'none', sm: 'flex' } }}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ArrowForwardIos />
        </NervCarouselButton>
      </Box>
    </Box>
  );
};

export default TotensSection;