import React from "react";
import css from "./Ads.module.css";

// FRAMER MOTION
import { motion } from "framer-motion";
import { cardVariants } from "../../MotionVariants";

// LOADER
import Loader from "../../Loader";

const Ads = ({ data, loading, error }) => {
  return (
    <div className={css.ads}>
      {loading ? (
        <div className="center">
          <Loader />
        </div>
      ) : error ? (
        <p className="center">Error fetching data!</p>
      ) : (
        data[1].data.map((ad, i) => (
          <motion.a
            className={css.ads__item}
            href={ad.link ? ad.link : null}
            target="_blank"
            rel="norefferer noopener"
            variants={cardVariants}
            whileHover="whileHover"
            key={i}
          >
            <div
              className={css.ads__item__cover}
              id={ad.name === "Your ad" ? css.yourAd : null}
              style={{
                backgroundImage: `url(${ad.cover})`,
              }}
              alt={ad.name}
            />
            <div className={css.ads__item__info}>
              <h4 className={css.ads__item__info__title}>{ad.name}</h4>
              <p className={css.ads__item__info__description}>
                {ad.description}
              </p>
            </div>
          </motion.a>
        ))
      )}
    </div>
  );
};

export default Ads;
