import React from "react";
import css from "./Tags.module.css";
import TagsItem from "./TagsItem";

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
  { name: "Communities", icon: "📣" },
];

const Tags = ({ category, setCategory, data, loading }) => {
  return (
    <aside className={css.tags}>
      {categories.map((cat, i) => (
        <TagsItem
          category={cat.name}
          setCategory={setCategory}
          categoryActive={category === cat.name ? true : false}
          icon={cat.icon}
          appsNum={
            loading
              ? null
              : cat.name === "All"
              ? data[0].data.length
              : data[0].data.filter((item) => item.category == cat.name).length
          }
          key={i}
        />
      ))}
    </aside>
  );
};

export default Tags;
