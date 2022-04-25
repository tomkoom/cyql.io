import React from "react";
import css from "./AppListGrid.module.css";
import { toApp } from "../../../../Routes/routes";

//icons
import { iDatabase, iGithub } from "../../../../Icons/Icons";

// redux
import { useSelector } from "react-redux";
import { selectView } from "../../../../State/view";
import { selectSearchProjects } from "../../../../State/searchProjects";
import { selectItemsVisible } from "../../../../State/loadMore";
import { selectProjects } from "../../../../State/projects";
import { selectCategory } from "../../../../State/category";

const AppListGrid = () => {
  const view = useSelector(selectView);
  const searchValue = useSelector(selectSearchProjects);
  const itemsVisible = useSelector(selectItemsVisible);
  const projects = useSelector(selectProjects);
  const category = useSelector(selectCategory);

  return (
    <div>
      {view === "grid" && (
        <div className={css.li}>
          {projects
            .filter((project) => (category === "All" ? project : project.category === category))
            .filter((p) => {
              if (searchValue === "") {
                return p;
              } else if (p.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return p;
              }
            })
            .sort((a) => (a.promoted ? -1 : 0))
            .slice(0, itemsVisible)
            .map((d) => (
              <div key={d.id} className={css.li__i}>
                <button className="linkBlock" onClick={() => toApp(d.id)}>
                  <div
                    className={css.li__item__linkBlock__coverImg}
                    style={d.cover ? { backgroundImage: `url(${d.cover})` } : { display: "none" }}
                  />
                  <div className={css.li__item__linkBlock__appInfo}>
                    <img
                      className={css.li__item__linkBlock__appInfo__logo}
                      src={d.logo}
                      alt={d.name}
                      style={d.logo ? null : { display: "none" }}
                    />
                    <div className={css.li__item__linkBlock__appInfo__description}>
                      <div>
                        <h3>
                          {d.name}
                          &nbsp;
                          {d.category == "Social Networks"
                            ? "🎯"
                            : d.category == "Games"
                            ? "⚔️"
                            : d.category == "dApps"
                            ? "🔗"
                            : d.category == "DeFi"
                            ? "‍🌾"
                            : d.category == "DAOs"
                            ? "🏠"
                            : d.category == "Infrastructure"
                            ? "🚀"
                            : d.category == "Wallets"
                            ? "👛"
                            : d.category == "Tools"
                            ? "🛠️"
                            : d.category == "Explorers"
                            ? "🌎"
                            : d.category == "NFTs"
                            ? "🗿"
                            : null}
                        </h3>
                        {d.promoted && <span>{d.promoted ? "Promoted" : null}</span>}
                      </div>

                      {d.github || d.canister || d.tags ? (
                        <ul>
                          {d.canister && <li>{iDatabase} Deployed to IC</li>}
                          {d.github && <li>{iGithub} Open Source</li>}
                          {d.tags == "Psychedelic" && (
                            <li>
                              <img
                                src="https://psychedelic.ooo/images/11-2.svg"
                                alt="Psychedelic"
                              />
                              &nbsp;
                              {d.tags}
                            </li>
                          )}
                          {d.tags == "toniqlabs" && <li>{d.tags}</li>}
                        </ul>
                      ) : null}

                      <p className={css.appDescription}>
                        {d.description && d.description.length > 70
                          ? `${d.description.substring(0, 70)}…`
                          : d.description}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AppListGrid;
