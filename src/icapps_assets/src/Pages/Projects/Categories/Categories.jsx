import React from "react";
import css from "./Categories.module.css";
import Category from "./Category/Category";

// redux
import { useSelector } from "react-redux";
import { selectProjects } from "../../../State/siteData";

const categories = [
  { name: "All", icon: "" },
  { name: "Games", icon: "⚔️" },
  { name: "NFTs", icon: "🗿" },
  { name: "dApps", icon: "🔗" },
  { name: "DeFi", icon: "‍🌾" },
  { name: "DAOs", icon: "🏠" },
  { name: "Social Networks", icon: "🎯" },
  { name: "Infrastructure", icon: "🚀" },
  { name: "Wallets", icon: "👛" },
  { name: "Tools", icon: "🛠️" },
  { name: "Explorers", icon: "🌎" },
  { name: "Dfinity Apps", icon: "♾️" },
  { name: "Metaverse", icon: "" },
  // { name: "Storage", icon: "📦" },
  { name: "Education", icon: "🎓" },
  { name: "Communities", icon: "📣" },
];

const Categories = ({ category, setCategory }) => {
  const projects = useSelector(selectProjects);

  return (
    <div className={css.categoryBtns}>
      {categories.map((cat) => (
        <Category
          categoryName={cat.name}
          setCategory={setCategory}
          categoryActive={category === cat.name ? true : false}
          icon={cat.icon}
          projectsNum={
            cat.name === "All"
              ? projects.length
              : projects.filter((p) => p.category == cat.name).length
          }
          key={cat.name}
        />
      ))}
    </div>
  );
};

export default Categories;
