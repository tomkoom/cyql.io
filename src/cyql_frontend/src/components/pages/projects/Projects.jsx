import React from "react";
import css from "./Projects.module.css";

// components
import { Category, Filter, ProjectList, Sort } from "./index";
import { Search } from "@/components/ui/_index";

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { selectSearch, setSearch } from "@/state/projects/search";
import {
  setFilterByOnChain,
  selectFilterByOnChain,
  setFilterByOpenSource,
  selectFilterByOpenSource,
  setFilterByGrantee,
  selectFilterByGrantee,
} from "@/state/projects/filter";

const Projects = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearch);
  const filterByOpenSource = useAppSelector(selectFilterByOpenSource);
  const filterByOnChain = useAppSelector(selectFilterByOnChain);
  const filterByGrantee = useAppSelector(selectFilterByGrantee);

  const setProjectsSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className={css.projects}>
      <h2 className="pageTitle">discover new projects</h2>
      <Search
        placeholder={"search by project name"}
        searchQuery={searchQuery}
        setSearch={setProjectsSearch}
      />
      <div className={css.controls}>
        <div className={css.controlsI}>
          <Category />
          <Filter
            label={"open-source:"}
            filter={filterByOpenSource}
            setFilter={setFilterByOpenSource}
          />
          <Filter label={"onchain:"} filter={filterByOnChain} setFilter={setFilterByOnChain} />
          <Filter label={"grantee:"} filter={filterByGrantee} setFilter={setFilterByGrantee} />
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
