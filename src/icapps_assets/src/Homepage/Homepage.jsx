import React from "react";
import css from "./Homepage.module.css";

// COMPONENTS
import Heading from "./Heading/Heading";
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
  return (
    <div className={`${css.homepage} container1600`}>
      <Heading />

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
        <AppList loading={loading} error={error} filteredApps={filteredApps} />

        {/* ADS */}
        <Ads data={data} loading={loading} error={error} />
      </main>
    </div>
  );
};

export default Homepage;
