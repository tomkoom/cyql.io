import React from "react";
import css from "./PartnersBadge.module.css";

const partners = [
  { label: "Golka", img: "https://i.postimg.cc/50PprTYH/golka-userimg-rec.png" },
  { label: "Entrepot", img: "https://i.postimg.cc/bYVLq76L/entrepot-logo-168.png" },
];

const PartnersBadge = () => {
  return (
    <div className={css.badge}>
      <p>Media Partners</p>
      {partners.map((p) => (
        <div className={css.logo} key={p.label}>
          <img src={p.img} alt={`${p.label} logo"`} />
          <p>{p.label}</p>
        </div>
      ))}
    </div>
  );
};

export default PartnersBadge;
