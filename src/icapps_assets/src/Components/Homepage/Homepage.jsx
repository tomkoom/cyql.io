import React, { useState } from "react";
import css from "./Homepage.module.css";

// COMPONENTS
import Heading from "./Heading/Heading";
import SearchBar from "../SearchBar/SearchBar";
import AppList from "./AppList/AppList";
import Tags from "./Tags/Tags";
import Ads from "./Ads/Ads";
import TagsFilter from "../TagsFilter/TagsFilter";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setSearchProjects } from "../../Redux/searchProjectsSlice";

const Homepage = ({
  category,
  setCategory,
  filteredApps,
  data,
  loading,
  error,
}) => {
  // redux
  const searchProjectsValue = useSelector(
    (state) => state.searchProjects.value
  );
  const dispatch = useDispatch();
  const handleSearchProjects = (e) => {
    dispatch(setSearchProjects(e.target.value));
  };

  return (
    <main className={`${css.homepage} container1600`}>
      <div className={css.homepage__hero}>
        <Heading />
        <SearchBar
          searchValue={searchProjectsValue}
          handleSearch={handleSearchProjects}
          inputName="projects-search"
        />
        {/* <TagsFilter /> */}
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
          searchValue={searchProjectsValue}
        />

        {/* ADS */}
        <Ads data={data} loading={loading} error={error} />
      </main>
    </main>
  );
};

export default Homepage;
