import React from "react";

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact-section">
      <h2 className="contact-title">Contact</h2>
      <div className="contact-row">
        <span className="contact-info">
          <strong>Email :</strong>{" "}
          <a href="mailto:mathis.champin@epitech.eu">mathis.champin@epitech.eu</a>
        </span>
        <span className="contact-info">
          <strong>Localisation :</strong> Le Perreux-sur-Marne, 94170
        </span>
        <span className="contact-socials">
          <a
            href="https://www.instagram.com/ton_pseudo_instagram/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social"
            aria-label="Instagram"
          >
            <img src="/icons/instagram.svg" alt="Instagram" />
          </a>
          <a
            href="https://www.linkedin.com/in/ton_pseudo_linkedin/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social"
            aria-label="LinkedIn"
          >
            <img src="/icons/linkedin.svg" alt="LinkedIn" />
          </a>
        </span>
      </div>
    </section>
  );
}
