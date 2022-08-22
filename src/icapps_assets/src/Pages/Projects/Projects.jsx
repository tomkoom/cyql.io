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
} from "../../State/filter";

const Projects = () => {
  const filterByOpenSource = useSelector(selectFilterByOpenSource);
  const filterByOnChain = useSelector(selectFilterByOnChain);

  return (
    <main className={css.apps}>
      <h2 className="pageTitle">Discover new projects</h2>
      <Search />
      <div className={css.controls}>
        <Sort />
        <Category />
        <Filter
          label={"Open source:"}
          filter={filterByOpenSource}
          setFilter={setFilterByOpenSource}
        />
        <Filter label={"On-chain:"} filter={filterByOnChain} setFilter={setFilterByOnChain} />
      </div>
      <ProjectList />
      {/* <Tags /> */}
    </main>
  );
};

export default Projects;
