// LoadingOverlay.jsx
import { Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingOverlay() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) return 100;
        return Math.min(oldProgress + 1, 100);
      });
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "#0a0a12",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'Orbitron', sans-serif",
      }}
    >      
      
      {/* Ícone de totem com animação */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "relative",
          width: 100,
          height: 160,
          marginBottom: "2rem",
        }}
      >
        {/* Corpo do totem */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "linear-gradient(145deg, #1a1a2e, #0a0a12)",
            borderRadius: "8px",
            border: "1px solid #7d26cd",
            boxShadow: "0 0 15px rgba(125, 38, 205, 0.5)",
          }}
        />
        
        {/* Tela do totem - animação de loading */}
        <motion.div
          animate={{ 
            opacity: [0.4, 1, 0.4],
            boxShadow: [
              "0 0 5px rgba(0, 255, 157, 0.3)",
              "0 0 20px rgba(0, 255, 157, 0.7)",
              "0 0 5px rgba(0, 255, 157, 0.3)"
            ]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity 
          }}
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "80%",
            height: "40%",
            background: "#0a0a12",
            borderRadius: "4px",
            border: "1px solid #00ff9d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress 
            size={30} 
            thickness={5}
            sx={{ color: "#00ff9d" }} 
          />
        </motion.div>
        
        {/* Base do totem */}
        <Box
          sx={{
            position: "absolute",
            bottom: "-10px",
            left: "20%",
            width: "60%",
            height: "10px",
            background: "#7d26cd",
            borderRadius: "2px",
          }}
        />
      </motion.div>
      
      {/* Texto estilizado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: "1.8rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          background: "linear-gradient(90deg, #7d26cd, #00ff9d)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 0 10px rgba(0, 255, 157, 0.3)",
          marginBottom: "1.5rem",
        }}
      >
        NERV TOTEM
      </motion.div>
      
      {/* Barra de progresso minimalista */}
      <Box sx={{
        width: "300px",
        height: "6px",
        background: "rgba(125, 38, 205, 0.3)",
        borderRadius: "3px",
        overflow: "hidden",
        position: "relative",
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #7d26cd, #00ff9d)",
            boxShadow: "0 0 10px #00ff9d",
          }}
        />
      </Box>
      
      {/* Porcentagem numérica */}
      <Box sx={{
        marginTop: "1rem",
        fontSize: "1.2rem",
        color: "#00ff9d",
        fontWeight: 700,
      }}>
        {progress}%
      </Box>
      
      {/* Mensagem de carregamento */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: "1.5rem",
          fontSize: "0.9rem",
          color: "#7d26cd",
          maxWidth: "300px",
          textAlign: "center",
          fontFamily: "'Rajdhani', sans-serif",
        }}
      >
        Inicializando sistema de autoatendimento...
      </motion.div>
    </Box>
  );
}