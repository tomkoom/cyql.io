import React from "react";
import css from "./AppListRows.module.css";

// Routes
import { toApp } from "../../../../Routes/routes";

// Redux
import { useSelector } from "react-redux";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faDiscord,
  faTelegram,
  faGithub,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";

const iconLink = <FontAwesomeIcon icon={faLink} />;
const iconTwitter = <FontAwesomeIcon icon={faTwitter} />;
const iconDiscord = <FontAwesomeIcon icon={faDiscord} />;
const iconTelegram = <FontAwesomeIcon icon={faTelegram} />;
const iconGithub = <FontAwesomeIcon icon={faGithub} />;
const iconMedium = <FontAwesomeIcon icon={faMedium} />;

const AppListRows = ({ searchValue, itemsVisible }) => {
  // state
  const view = useSelector((state) => state.view.view.value);

  const tagOpenSource = useSelector(
    (state) => state.projectsFiltering.openSource.value
  );
  const tagDeployedToIc = useSelector(
    (state) => state.projectsFiltering.deployedToIc.value
  );
  const tagPsychedelic = useSelector(
    (state) => state.projectsFiltering.psychedelic.value
  );
  const tagToniqlabs = useSelector(
    (state) => state.projectsFiltering.toniqlabs.value
  );

  const filteredByCategory = useSelector(
    (state) => state.projectsFiltering.filteredByCategory
  );

  const filteredByTag = useSelector(
    (state) => state.projectsFiltering.filteredByTag
  );

  const filteredProjects =
    tagOpenSource || tagDeployedToIc || tagPsychedelic || tagToniqlabs
      ? filteredByTag
      : filteredByCategory;

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
                <th>NFT preview</th>
                <th>Added</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects
                .filter((app) => {
                  if (searchValue === "") {
                    return app;
                  } else if (
                    app.name.toLowerCase().includes(searchValue.toLowerCase())
                  ) {
                    return app;
                  }
                })
                // filter by tag
                .filter((app) => {
                  if (tagOpenSource) {
                    return app.github;
                  } else if (tagDeployedToIc) {
                    return app.canister;
                  } else if (tagPsychedelic) {
                    return app.tags === "Psychedelic";
                  } else if (tagToniqlabs) {
                    return app.tags === "toniqlabs";
                  } else {
                    return app;
                  }
                })
                // load more
                .slice(0, itemsVisible)
                .map((app) => (
                  <tr onClick={() => toApp(app.id)} key={app.id}>
                    <td className={css.maincoll}>
                      <div>
                        {app.logo && (
                          <img
                            src={app.logo}
                            alt={`${app.name} logo`}
                            className={css.applogo}
                          />
                        )}
                        <span>
                          <h4>{app.name}</h4>
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
                        {app.website && <li>{iconLink}</li>}
                        {app.twitter && <li>{iconTwitter}</li>}
                        {app.discord && <li>{iconDiscord}</li>}
                        {app.telegram && <li>{iconTelegram}</li>}
                        {app.github && <li>{iconGithub}</li>}
                        {app.medium && <li>{iconMedium}</li>}
                      </ul>
                    </td>

                    {/* canister */}
                    <td>
                      {app.canister
                        ? `${app.canister.split("//").pop().substring(0, 16)}…`
                        : ""}
                    </td>

                    {/* nft preview */}
                    <td className={css.nftpreview}>
                      <ul>
                        {app.nftImg1 && (
                          <li>
                            <div
                              style={{ backgroundImage: `url(${app.nftImg1})` }}
                            />
                          </li>
                        )}
                        {app.nftImg2 && (
                          <li>
                            <div
                              style={{ backgroundImage: `url(${app.nftImg2})` }}
                            />
                          </li>
                        )}
                        {app.nftImg3 && (
                          <li>
                            <div
                              style={{ backgroundImage: `url(${app.nftImg3})` }}
                            />
                          </li>
                        )}
                        {app.nftImg4 && (
                          <li>
                            <div
                              style={{ backgroundImage: `url(${app.nftImg4})` }}
                            />
                          </li>
                        )}
                      </ul>
                    </td>
                    {/* date added */}
                    <td>{app.dateAdded}</td>
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
