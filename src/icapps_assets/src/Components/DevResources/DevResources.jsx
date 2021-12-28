import React from "react";
import css from "./DevResources.module.css";
import Loader from "../../CatLoader";
// Framer Motion
import { motion } from "framer-motion";
import { cardVariants } from "../../motionVariants";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "../../../../../node_modules/@fortawesome/free-solid-svg-icons/index";
// Redux
import { useSelector } from "react-redux";

const iconArrowRight = (
  <FontAwesomeIcon
    icon={faArrowRight}
    color="rgba(255,255,255,0.33)"
    className="arrow-icon"
  />
);

const DevResources = () => {
  const devResources = useSelector((state) => state.siteData.devResources);

  return (
    <section className={`${css.dev} container1280`}>
      {/* HERO */}
      <div className={css.dev__hero}>
        <h2>🛠️ Developer Resources</h2>
        <p className="bodyText">
          Explore tools, documentations, tutorials and other resources for
          developers.
        </p>
      </div>

      {/* CONTENT */}
      {!devResources.length ? (
        <Loader />
      ) : (
        <div className={css.dev__res}>
          {devResources.map((d, i) => (
            <motion.a
              className={css.dev__res__linkBlock}
              href={d["URL"]}
              target="_blank"
              rel="noreferrer noopener"
              key={i}
              variants={cardVariants}
              whileHover="whileHover"
            >
              <div className={css.dev__res__linkBlock__item}>
                {d["Cover"] ? (
                  <img
                    className={css.dev__res__linkBlock__item__cover}
                    src={d["Cover"]}
                    alt={`${d["Name"]} Cover`}
                  />
                ) : null}

                <div className={css.dev__res__linkBlock__item__info}>
                  <div className={css.dev__res__linkBlock__item__info__main}>
                    <h3>{d["Name"]}</h3>
                    <p className="bodyText">{d["Description"]}</p>
                  </div>

                  <div className={css.dev__res__linkBlock__item__info__foot}>
                    <span className={css.dev__res__linkBlock__item__info__tag}>
                      {d["Tag"]}
                    </span>
                    {iconArrowRight}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
};

export default DevResources;
