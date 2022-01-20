import React from "react";
import css from "./RecentlyAdded.module.css";
import { toApp } from "../../../Routes/routes";
import Loader from "../../../Loader";

// Framer Motion
import { motion } from "framer-motion";
import { cardVariants } from "../../../motionVariants";

// Redux
import { useSelector } from "react-redux";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const iconDatabase = <FontAwesomeIcon icon={faDatabase} />;
const iconGithub = <FontAwesomeIcon icon={faGithub} />;

const RecentlyAdded = () => {
  const apps = useSelector((state) => state.siteData.projects);

  return (
    <ul className={css.appLi}>
      {!apps.length ? (
        <Loader />
      ) : (
        apps.slice(0, 23).map((app) => (
          <motion.li
            key={app.id}
            className={css.appLi__i}
            variants={cardVariants}
            whileHover="whileHover"
          >
            <button onClick={() => toApp(app.id)} className="linkBlock">
              <div
                className={css.appLi__i__linkBlock__cover}
                style={app.cover && { backgroundImage: `url(${app.cover})` }}
              />
              <div className={css.appLi__i__linkBlock__appInfo}>
                <img
                  className={css.appLi__i__linkBlock__appInfo__logo}
                  src={app.logo}
                  alt={app.name}
                  style={app.logo ? null : { display: "none" }}
                />
                <div className={css.appLi__i__linkBlock__appInfo__desc}>
                  <h3 className={css.appLi__i__linkBlock__appInfo__desc__title}>
                    {app.name}
                  </h3>

                  <ul>
                    <li>{app.category}</li>
                    {app.canister && (
                      <li>{iconDatabase}&nbsp;&nbsp;Deployed to IC</li>
                    )}
                    {app.github && <li>{iconGithub}&nbsp;&nbsp;Open Source</li>}

                    {app.tags == "Psychedelic" && (
                      <li>
                        <img
                          src="https://psychedelic.ooo/images/11-2.svg"
                          alt="Psychedelic"
                        />
                        &nbsp;&nbsp;
                        {app.tags}
                      </li>
                    )}
                    {app.tags == "toniqlabs" && <li>{app.tags}</li>}
                  </ul>

                  <p className={css.appDescription}>
                    {app.description && app.description.length > 60
                      ? `${app.description.substring(0, 60)}…`
                      : app.description}
                  </p>
                </div>
              </div>
            </button>
          </motion.li>
        ))
      )}
      {apps.length > 0 && (
        <motion.Link
          to="/apps"
          className={css.viewAllAppsCard}
          variants={cardVariants}
          whileHover="whileHover"
        >
          View all {apps.length} projects &gt;
        </motion.Link>
      )}
    </ul>
  );
};

export default RecentlyAdded;
