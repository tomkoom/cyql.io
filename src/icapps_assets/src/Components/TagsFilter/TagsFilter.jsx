import React from "react";
import css from "./TagsFilter.module.css";
import TagsFilterItem from "./TagsFilterItem/TagsFilterItem";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../Redux/filterProjectsSlice";

const TagsFilter = () => {
  const dispatch = useDispatch();

  // State
  const openSource = useSelector((state) => state.filterProjects.openSource);
  const deployedToIc = useSelector(
    (state) => state.filterProjects.deployedToIc
  );
  const psychedelic = useSelector((state) => state.filterProjects.psychedelic);

  const filterProjects = (checkbox) => {
    dispatch(setFilter({ value: checkbox }));
  };

  const filterChecboxes = [
    { id: "openSource", value: "Open Source" },
    { id: "deployedToIc", value: "Deployed to IC" },
    { id: "psychedelic", value: "Psychedelic" },
    { id: "toniqlabs", value: "toniqlabs" },
  ];

  return (
    <div className={css.tagsFilter}>
      {filterChecboxes.map((checkbox, i) => (
        <TagsFilterItem
          id={checkbox.id}
          value={checkbox.value}
          handleChange={() => filterProjects(checkbox.id)}
          key={i}
        />
      ))}
    </div>
  );
};

export default TagsFilter;
