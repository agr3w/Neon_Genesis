// src/content/MidleSection.jsx
import React from "react";
import "./MidleSection.css";

const MidleSection = () => {
  const partners = [
    { name: "Microsoft", logo: "https://via.placeholder.com/150?text=Microsoft" },
    { name: "AWS", logo: "https://via.placeholder.com/150?text=AWS" },
    { name: "Google Cloud", logo: "https://via.placeholder.com/150?text=Google+Cloud" },
    { name: "IBM", logo: "https://via.placeholder.com/150?text=IBM" },
  ];

  return (
    <section className="midle-section" data-aos="fade-up" data-aos-duration="1000">
      <h2>Nossos Parceiros</h2>
      <div className="partners-container">
        {partners.map((partner, index) => (
          <div key={index} className="partner-card">
            <img src={partner.logo} alt={partner.name} />
            <p>{partner.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MidleSection;
