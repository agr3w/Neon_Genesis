import React, { useState } from "react";
import { Typography, IconButton } from "@mui/material";
import Modal from "../../../components/modal/Modal";
import "./MidleSection.css";
import differentialsData from "../../../data/differentialsData";

const MidleSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDiff, setSelectedDiff] = useState(null);

  const handleCardClick = (diff) => {
    setSelectedDiff(diff);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedDiff(null);
  };

  return (
    <section className="midle-section">
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Nossos Diferenciais
      </Typography>

      <div className="differentials-container">
        {differentialsData.map((diff, index) => (
          <div
            key={index}
            className="differential-card-wrapper"
            data-aos="fade-up"
            data-aos-delay={200 * index}
            onClick={() => handleCardClick(diff)}
          >
            <div className="differential-card">
              <IconButton
                color="primary"
                size="large"
                disableRipple
                disableFocusRipple
              >
                {diff.icon}
              </IconButton>
            </div>
            <Typography variant="body2" className="differential-label">
              {diff.title}
            </Typography>
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