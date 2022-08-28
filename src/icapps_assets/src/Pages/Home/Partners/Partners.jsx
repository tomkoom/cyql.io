import React from "react";
import css from "./Partners.module.css";

const partners = [
  {
    id: "ICPL",
    img: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/icpl/icpl-logo.svg",
    link: "https://qbw7d-giaaa-aaaaj-aalta-cai.ic0.app/",
  },
];

const Partners = () => {
  return (
    <div className={css.partners}>
      {partners.map((p) => (
        <a className={css.link} href={p.link} target="_blank" rel="noreferrer noopener" key={p.id}>
          <img className={css.img} src={p.img} alt={`${p.id}-logo`} />
        </a>
      ))}
    </div>
  );
};

export default Partners;
