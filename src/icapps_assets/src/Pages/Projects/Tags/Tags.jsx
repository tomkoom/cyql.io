import React from "react";
import css from "./Tags.module.css";
import TagsItem from "./TagsItem/TagsItem";

// icons
import { iDatabase, iGithub } from "../../../Icons/Icons";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setFilterByTag } from "../../../State/projectsFiltering";

const Tags = () => {
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

  const tags = [
    {
      id: "openSource",
      name: "Open Source",
      state: openSource,
      img: "",
      icon: iGithub,
    },
    {
      id: "deployedToIc",
      name: "Deployed to IC",
      state: deployedToIc,
      img: "",
      icon: iDatabase,
    },
    {
      id: "psychedelic",
      name: "Psychedelic",
      state: psychedelic,
      img: "https://psychedelic.ooo/images/11-2.svg",
      icon: "",
    },
    {
      id: "toniqlabs",
      name: "toniqlabs",
      state: toniqlabs,
      img: "https://i.postimg.cc/PfZBxHVY/entrepot-branmark.png",
      icon: "",
    },
  ];

  return (
    <div className={css.tags}>
      <div className={css.tags__content}>
        {tags.map((tag, i) => (
          <TagsItem
            id={tag.id}
            name={tag.name}
            handleChange={() => filterProjects(tag.id)}
            checkedState={tag.state}
            img={tag.img}
            icon={tag.icon}
            emoji={tag.emoji}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Tags;
