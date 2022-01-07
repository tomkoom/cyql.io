import React from "react";
import css from "./CategoryBtns.module.css";
import CategoryBtnsItem from "./CategoryBtnsItem/CategoryBtnsItem";

// Redux
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
  { name: "Domains", icon: "🤖" },
  { name: "Storage", icon: "📦" },
  { name: "Explorers", icon: "🌎" },
  { name: "Dfinity Apps", icon: "♾️" },
  { name: "Education", icon: "🎓" },
  { name: "Communities", icon: "📣" },
];

const CategoryBtns = ({ category, setCategory }) => {
  const projects = useSelector((state) => state.siteData.projects);

  return (
    <aside className={css.categoryBtns}>
      <h6 className={css.categoryBtns__caption}>Categories</h6>
      <div className={css.categoryBtns__content}>
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
    </aside>
  );
};

export default CategoryBtns;
