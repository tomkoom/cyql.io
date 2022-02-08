import React from "react";
import css from "./CategoryBtns.module.css";
import CategoryBtnsItem from "./CategoryBtnsItem/CategoryBtnsItem";

// redux
import { useSelector } from "react-redux";

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
  { name: "Domains", icon: "🤖" },
  { name: "Storage", icon: "📦" },
  { name: "Education", icon: "🎓" },
  { name: "Communities", icon: "📣" },
];

const CategoryBtns = ({ category, setCategory }) => {
  const projects = useSelector((state) => state.siteData.projects.value);

  return (
    <div className={css.categoryBtns}>
      {categories.map((cat, i) => (
        <CategoryBtnsItem
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
    </div>
  );
};

export default CategoryBtns;
