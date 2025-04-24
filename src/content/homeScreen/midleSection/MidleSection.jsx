// src/content/MidleSection.jsx
import React, { useState } from "react";
import { Typography, IconButton } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import Modal from "../../../components/modal/Modal";
import "./MidleSection.css";

const MidleSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDiff, setSelectedDiff] = useState(null);

  const differentials = [
    {
      icon: <AccessTimeIcon fontSize="large" />,
      title: "Atendimento 24h",
      image:
        "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=",
      details: "Suporte ininterrupto para garantir funcionamento sem falhas.",
    },
    {
      icon: <TouchAppIcon fontSize="large" />,
      title: "Interface Intuitiva",
      image:
        "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=",
      details: "Design amigável que facilita a navegação e uso dos totens.",
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: "Segurança Avançada",
      image:
        "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=",
      details: "Criptografia de ponta para proteger dados e transações.",
    },
    {
      icon: <SettingsAccessibilityIcon fontSize="large" />,
      title: "Flexibilidade",
      image:
        "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=",
      details:
        "Adaptação às necessidades do seu negócio, com soluções escaláveis.",
    },
  ];

  const handleCardClick = (diff) => {
    setSelectedDiff(diff);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedDiff(null); // Adiciona um pequeno delay no fechamento
  };

  return (
    <section className="midle-section">
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Nossos Diferenciais
      </Typography>

      <div className="differentials-container">
        {differentials.map((diff, index) => (
          <div
            key={index}
            className="differential-card"
            data-aos="fade-up"
            data-aos-delay={200 * index}
            onClick={() => handleCardClick(diff)}
          >
            <IconButton
              color="primary"
              size="large"
              disableRipple
              disableFocusRipple
            >
              {diff.icon}
            </IconButton>
          </div>
        ))}
      </div>

      <Modal open={openModal} onClose={closeModal}>
        {selectedDiff && (
          <div className="modal-content">
            <img
              src={selectedDiff.image}
              alt={selectedDiff.title}
              className="modal-image"
            />
            <Typography variant="h5" component="h3">
              {selectedDiff.title}
            </Typography>
            <Typography variant="body1">{selectedDiff.details}</Typography>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default MidleSection;
