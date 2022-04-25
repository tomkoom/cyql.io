import React from "react";
import css from "./Categories.module.css";
import Category from "./Category/Category";

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
  { name: "Education", icon: "🎓" },
  { name: "Communities", icon: "📣" },
];

const Categories = () => {
  return (
    <div className={css.categoryBtns}>
      {categories.map((cat) => (
        <Category categoryName={cat.name} icon={cat.icon} key={cat.name} />
      ))}
    </div>
  );
};

export default Categories;
