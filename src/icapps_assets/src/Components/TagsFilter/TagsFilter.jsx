import React from "react";
import css from "./TagsFilter.module.css";
import TagsFilterItem from "./TagsFilterItem/TagsFilterItem";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setFilterByTag } from "../../Redux/projectsFilteringSlice";

const TagsFilter = () => {
  const dispatch = useDispatch();

  // State
  const openSource = useSelector(
    (state) => state.projectsFiltering.openSource.value
  );
  const deployedToIc = useSelector(
    (state) => state.projectsFiltering.deployedToIc.value
  );
  const psychedelic = useSelector(
    (state) => state.projectsFiltering.psychedelic.value
  );
  const toniqlabs = useSelector(
    (state) => state.projectsFiltering.toniqlabs.value
  );

  const filterProjects = (checkbox) => {
    dispatch(setFilterByTag({ value: checkbox }));
  };

  const filterChecboxes = [
    { id: "openSource", name: "Open Source", state: openSource },
    { id: "deployedToIc", name: "Deployed to IC", state: deployedToIc },
    { id: "psychedelic", name: "Psychedelic", state: psychedelic },
    { id: "toniqlabs", name: "toniqlabs", state: toniqlabs },
  ];

  return (
    <div className={css.tagsFilter}>
      <h6>Tags</h6>
      <div className={css.tagsFilter__content}>
        {filterChecboxes.map((checkbox, i) => (
          <TagsFilterItem
            id={checkbox.id}
            name={checkbox.name}
            handleChange={() => filterProjects(checkbox.id)}
            checkedState={checkbox.state}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TagsFilter;
