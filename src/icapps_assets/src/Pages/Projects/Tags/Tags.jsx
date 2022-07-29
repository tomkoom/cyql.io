import React from "react";
import css from "./Tags.module.css";
import Tag from "./Tag/Tag";

// icons
import { iDatabase, iGithub } from "../../../Icons/Icons";

// redux
import { useSelector, useDispatch } from "react-redux";

const Tags = () => {
  const dispatch = useDispatch();
  const openSource = useSelector((state) => state.projectsFiltering.openSource.value);
  const deployedToIc = useSelector((state) => state.projectsFiltering.deployedToIc.value);

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
  ];

  return (
    <div className={css.tags}>
      <div className={css.tags__content}>
        {tags.map((tag, i) => (
          <Tag
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
