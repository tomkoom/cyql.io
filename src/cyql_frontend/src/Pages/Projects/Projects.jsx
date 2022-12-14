import React from "react";
import css from "./Projects.module.css";

// components
import { Category, Filter, ProjectList, Search, Sort } from "./index";

// state
import { useSelector } from "react-redux";
import {
  setFilterByOnChain,
  selectFilterByOnChain,
  setFilterByOpenSource,
  selectFilterByOpenSource,
  setFilterByGrantee,
  selectFilterByGrantee,
} from "@state/projects/filter";

const Projects = () => {
  const filterByOpenSource = useSelector(selectFilterByOpenSource);
  const filterByOnChain = useSelector(selectFilterByOnChain);
  const filterByGrantee = useSelector(selectFilterByGrantee);

  return (
    <div className={css.apps}>
      <h2 className="pageTitle">Discover New Projects</h2>
      <Search />
      <div className={css.controls}>
        <div className={css.controlsI}>
          <Category />
          <Filter
            label={"Open source:"}
            filter={filterByOpenSource}
            setFilter={setFilterByOpenSource}
          />
          <Filter label={"On-chain:"} filter={filterByOnChain} setFilter={setFilterByOnChain} />
          <Filter label={"Grantee:"} filter={filterByGrantee} setFilter={setFilterByGrantee} />
        </div>

        <div className={css.controlsI}>
          <Sort />
        </div>
      </div>
      <ProjectList />
    </div>
  );
};

export default Projects;
