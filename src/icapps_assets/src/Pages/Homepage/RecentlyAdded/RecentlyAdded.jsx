import React from "react";
import css from "./RecentlyAdded.module.css";
import { toApp, toApps } from "../../../Routes/routes";
import Loader from "../../../Components/Loader/Loader";

// icons
import { iGithub, iDatabase } from "../../../Icons/Icons";

// redux
import { useSelector } from "react-redux";
import { selectProjects } from "../../../State/siteData";

const RecentlyAdded = () => {
  const apps = useSelector(selectProjects);

  return (
    <ul className={css.appLi}>
      {!apps.length ? (
        <Loader />
      ) : (
        apps
          .slice(0, 23)
          .sort((a) => (a.promoted ? -1 : 0))
          .map((app) => (
            <li
              key={app.id}
              className={`${css.appLi__i} ${
                app.promoted ? css.promoted : null
              }`}
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
                    <div
                      className={css.appLi__i__linkBlock__appInfo__desc__title}
                    >
                      <h3>{app.name}</h3>
                      {app.promoted && (
                        <span>{app.promoted ? "Promoted" : null}</span>
                      )}
                    </div>

                    <ul>
                      <li>{app.category}</li>
                      {app.canister && (
                        <li>{iDatabase}&nbsp;&nbsp;Deployed to IC</li>
                      )}
                      {app.github && <li>{iGithub}&nbsp;&nbsp;Open Source</li>}

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
                      {app.description && app.description.length > 50
                        ? `${app.description.substring(0, 50)}…`
                        : app.description}
                    </p>
                  </div>
                </div>
              </button>
            </li>
          ))
      )}
      {apps.length > 0 && (
        <button
          className={`${css.viewAllAppsCard} navlink`}
          onClick={() => toApps()}
        >
          View all {apps.length} projects &gt;
        </button>
      )}
    </ul>
  );
};

export default RecentlyAdded;
