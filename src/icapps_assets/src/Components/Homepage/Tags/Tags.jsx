import React from "react";
import css from "./Tags.module.css";
import TagsItem from "./TagsItem/TagsItem";
// Redux
import { useSelector } from "react-redux";

const categories = [
  { name: "All", icon: "" },
  { name: "Social Networks", icon: "🎯" },
  { name: "Games", icon: "⚔️" },
  { name: "NFTs", icon: "🗿" },
  { name: "dApps", icon: "🔗" },
  { name: "DeFi", icon: "‍🌾" },
  { name: "DAOs", icon: "🏠" },
  { name: "Infrastructure", icon: "🚀" },
  { name: "Wallets", icon: "👛" },
  { name: "Tools", icon: "🛠️" },
  { name: "Domains", icon: "🤖" },
  { name: "Storage", icon: "📦" },
  { name: "Explorers", icon: "🌎" },
  { name: "Dfinity Apps", icon: "♾️" },
  { name: "Education", icon: "🎓" },
  { name: "Communities", icon: "📣" },
];

const Tags = ({ category, setCategory }) => {
  const projects = useSelector((state) => state.siteData.projects);

  return (
    <aside className={css.tags}>
      {categories.map((cat, i) => (
        <TagsItem
          category={cat.name}
          setCategory={setCategory}
          categoryActive={category === cat.name ? true : false}
          icon={cat.icon}
          projectsNum={
            cat.name === "All"
              ? projects.length
              : projects.filter((p) => p.category == cat.name).length
          }
          key={i}
        />
      ))}
    </aside>
  );
};

export default Tags;
