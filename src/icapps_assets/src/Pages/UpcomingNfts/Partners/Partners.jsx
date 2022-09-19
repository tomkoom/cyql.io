import React from "react";
import css from "./Partners.module.css";

const partners = [
  { label: "Golka", img: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/partners/golka.png" },
  {
    label: "Entrepot",
    img: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/partners/entrepot.png",
  },
];

const Partners = () => {
  return (
    <div className={css.partners}>
      <p>Partners</p>
      {partners.map((p) => (
        <div className={css.logo} key={p.label}>
          <img src={p.img} alt={`${p.label} logo"`} />
          <p>{p.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Partners;
