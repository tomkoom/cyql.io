import React, { useState } from "react";
import css from "./Homepage.module.css";

// COMPONENTS
import Heading from "./Heading/Heading";
import Search from "./Search/Search";
import AppList from "./AppList/AppList";
import Tags from "./Tags/Tags";
import Ads from "./Ads/Ads";

const Homepage = ({
  category,
  setCategory,
  filteredApps,
  data,
  loading,
  error,
}) => {
  const [search, setSearch] = useState("");
  return (
    <main className={`${css.homepage} container1600`}>
      <div className={css.homepage__hero}>
        <Heading />
        <Search setSearch={setSearch} data={data} loading={loading} />
      </div>

      {/* CONTENT */}
      <main className={css.homepage__content}>
        {/* TAGS */}
        <Tags
          category={category}
          setCategory={setCategory}
          data={data}
          loading={loading}
        />

        {/* APP LIST */}
        <AppList
          loading={loading}
          error={error}
          filteredApps={filteredApps}
          search={search}
          setSearch={setSearch}
        />

        {/* ADS */}
        <Ads data={data} loading={loading} error={error} />
      </main>
    </main>
  );
};

export default Homepage;
