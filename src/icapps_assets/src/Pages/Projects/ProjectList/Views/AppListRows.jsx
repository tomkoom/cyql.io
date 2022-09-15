import React from "react";
import css from "./AppListRows.module.css";

// icons
import { iLink, iTwitter, iDiscord, iTelegram, iGithub, iMedium } from "../../../../Icons/Icons";

// routes
import { toApp } from "../../../../Routes/routes";

// redux
import { useSelector } from "react-redux";
import { selectView } from "../../../../State/view";
import { selectSearch } from "../../../../State/search";
import { selectItemsVisible } from "../../../../State/loadMore";
import { selectProjects } from "../../../../State/projects";
import { selectCategory } from "../../../../State/category";

const AppListRows = () => {
  const view = useSelector(selectView);
  const search = useSelector(selectSearch);
  const itemsVisible = useSelector(selectItemsVisible);
  const projects = useSelector(selectProjects);
  const category = useSelector(selectCategory);

  const formatDate = (timestamp) => {
    const ts = timestamp;
    const date = new Date(ts);
    return date.toDateString();
  };

  return (
    <section>
      <div style={{ overflowX: "auto" }}>
        {view === "rows" ? (
          <table className={css.t}>
            <thead className={css.thead}>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Links</th>
                <th>Canister</th>
                <th>Added</th>
                <th>NFT preview</th>
              </tr>
            </thead>
            <tbody>
              {projects
                .filter((project) => (category === "All" ? project : project.category === category))
                .filter((project) => {
                  if (search === "") {
                    return project;
                  } else if (
                    project.name &&
                    project.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return project;
                  }
                })
                // .sort((a) => (a.promoted ? -1 : 0))
                .slice(0, itemsVisible)
                .map((app) => (
                  <tr
                    className={app.promoted ? css.promoted : css.t__tbody__tr}
                    onClick={() => toApp(app.id)}
                    key={app.id}
                  >
                    <td className={css.maincoll}>
                      <div>
                        {app.logo && (
                          <img src={app.logo} alt={`${app.name} logo`} className={css.applogo} />
                        )}
                        <span>
                          <div>
                            <h4>{app.name}</h4>
                            {app.promoted && <span>{app.promoted ? "Promoted" : null}</span>}
                          </div>

                          <p>
                            {app.description && app.description.length > 70
                              ? `${app.description.substring(0, 70)}…`
                              : app.description}
                          </p>
                        </span>
                      </div>
                    </td>
                    <td className={css.category}>
                      <p>{app.category}</p>
                    </td>

                    {/* links */}
                    <td className={css.links}>
                      <ul>
                        {app.website && <li>{iLink}</li>}
                        {app.twitter && <li>{iTwitter}</li>}
                        {app.discord && <li>{iDiscord}</li>}
                        {app.telegram && <li>{iTelegram}</li>}
                        {app.github && <li>{iGithub}</li>}
                        {app.medium && <li>{iMedium}</li>}
                      </ul>
                    </td>

                    {/* canister */}
                    <td>
                      {app.canister ? `${app.canister.split("//").pop().substring(0, 16)}…` : ""}
                    </td>

                    {/* added */}
                    <td>{app.added ? formatDate(app.added) : ""}</td>

                    {/* nft preview */}
                    <td className={css.nftpreview}>
                      <ul>
                        {app.nftImg1 && (
                          <li>
                            <div style={{ backgroundImage: `url(${app.nftImg1})` }} />
                          </li>
                        )}
                        {app.nftImg2 && (
                          <li>
                            <div style={{ backgroundImage: `url(${app.nftImg2})` }} />
                          </li>
                        )}
                        {app.nftImg3 && (
                          <li>
                            <div style={{ backgroundImage: `url(${app.nftImg3})` }} />
                          </li>
                        )}
                        {app.nftImg4 && (
                          <li>
                            <div style={{ backgroundImage: `url(${app.nftImg4})` }} />
                          </li>
                        )}
                      </ul>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default AppListRows;
