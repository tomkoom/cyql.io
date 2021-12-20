import React, { useEffect } from "react";
import "./Developers.css";

// GOOGLE API
import useGoogleSheets from "use-google-sheets";
import k from "../../../../k/k";

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "../../../../node_modules/@fortawesome/free-solid-svg-icons/index";

// FRAMER MOTION
import { motion } from "framer-motion";
import { cardVariants } from "../MotionVariants";

// LOADER
import Loader from "../CatLoader";

const googleSheetsApiKey = k.GOOGLE_SHEETS_API;
const googleSheetId = k.GOOGLE_SHEET_ID;

const iconArrowRight = (
  <FontAwesomeIcon
    icon={faArrowRight}
    color="rgba(255,255,255,0.33)"
    className="arrow-icon"
  />
);

const Developers = () => {
  const { data, loading, error } = useGoogleSheets({
    apiKey: googleSheetsApiKey,
    sheetId: googleSheetId,
    sheetsNames: ["Developers"],
  });

  return (
    <section className="developers container1280">
      {/* HERO */}
      <div className="developers__hero">
        <h2>🛠️ Developer Resources</h2>
        <p className="body-text">
          Explore tools, documentations, tutorials and other resources for
          developers.
        </p>
      </div>

      {/* CONTENT */}
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="center">Error!</p>
      ) : (
        <div className="developer-resources">
          {data[0].data.map((d, i) => (
            <motion.a
              href={d["URL"]}
              target="_blank"
              rel="noreferrer noopener"
              key={i}
              variants={cardVariants}
              whileHover="whileHover"
              className="developer-resources__link-block"
            >
              <div className="developer-resources__link-block__item">
                {d["Cover"] ? (
                  <img
                    className="developer-resources__link-block__item__cover"
                    src={d["Cover"]}
                    alt={`${d["Name"]} Cover`}
                  />
                ) : null}

                <div className="developer-resources__link-block__item__info">
                  <div className="developer-resources__link-block__item__info__main">
                    <h3>{d["Name"]}</h3>
                    <p className="body-text">{d["Description"]}</p>
                  </div>

                  <div className="developer-resources__link-block__item__info__foot">
                    <span className="developer-resources__link-block__item__info__tag">
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

export default Developers;
