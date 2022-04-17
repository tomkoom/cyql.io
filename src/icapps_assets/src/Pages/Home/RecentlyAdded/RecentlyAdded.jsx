import React from "react";
import css from "./RecentlyAdded.module.css";

// routes
import { toApp, toApps } from "../../../Routes/routes";

// components
import { Loader, ViewMoreBtn } from "../../../Components/index";

// icons
import { iGithub, iDatabase } from "../../../Icons/Icons";

// redux
import { useSelector } from "react-redux";
import { selectProjectsNum } from "../../../State/siteData";

const RecentlyAdded = ({ projects }) => {
  const apps = projects;
  const projectsNum = useSelector(selectProjectsNum);

  return (
    <div>
      <ul className={css.appLi}>
        {!apps.length ? (
          <Loader />
        ) : (
          apps
            .slice(0, 10)
            .sort((a) => (a.promoted ? -1 : 0))
            .map((app) => (
              <li
                className={`${css.appLi__i} ${app.promoted ? css.promoted : null}`}
                onClick={() => toApp(app.id)}
                key={app.id}
              >
                {/* info */}
                <div className={css.appLi__i__linkBlock__appInfo}>
                  <div className={css.appLi__i__linkBlock__appInfo__header}>
                    {app.logo && <img className={css.projectlogo} src={app.logo} alt={app.name} />}

                    {/* name, category & tags */}
                    <div className={css.titletags}>
                      <div>
                        <h3>{app.name}</h3>
                      </div>

                      {app.category && app.category !== "NFTs" && (
                        <ul>
                          {app.category && <li>{app.category}</li>}
                          {app.canister && <li>{iDatabase}&nbsp;&nbsp;Hosted on IC</li>}
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
                      )}

                      <p className={css.projectDescription}>
                        {app.description && app.description.length > 50
                          ? `${app.description.substring(0, 50)}…`
                          : app.description}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))
        )}
      </ul>
      {apps.length > 0 && (
        <ViewMoreBtn nav={toApps}>View all {projectsNum} projects &gt;</ViewMoreBtn>
      )}
    </div>
  );
};

export default RecentlyAdded;
