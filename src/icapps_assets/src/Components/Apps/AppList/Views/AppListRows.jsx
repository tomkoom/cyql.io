import React from "react";
import css from "./AppListRows.module.css";

// icons
import {
  iLink,
  iTwitter,
  iDiscord,
  iTelegram,
  iGithub,
  iMedium,
} from "../../../../Icons/Icons";

// routes
import { toApp } from "../../../../Routes/routes";

// redux
import { useSelector } from "react-redux";

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
