import React from "react";
import css from "./Homepage.module.css";
import {
  Heading,
  SearchBar,
  Tags,
  AppList,
  CategoryBtns,
  Ads,
  Highlights,
} from "../";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setSearchProjects } from "../../Redux/searchProjectsSlice";

const Homepage = ({
  category,
  setCategory,
  filteredProjects,
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
      {/* HERO */}
      <div className={css.homepage__hero}>
        <Highlights />
        <Heading />

        {/* Search */}
        <SearchBar
          searchValue={searchProjectsValue}
          handleSearch={handleSearchProjects}
          inputName="projects-search"
        />

        {/* Tags */}
        <Tags />
      </div>

      {/* CONTENT */}
      <main className={css.homepage__content}>
        {/* Category btns */}
        <CategoryBtns
          category={category}
          setCategory={setCategory}
          data={data}
          loading={loading}
        />

        {/* App List */}
        <AppList
          loading={loading}
          error={error}
          filteredProjects={filteredProjects}
          searchValue={searchProjectsValue}
        />

        {/* ADS */}
        <Ads data={data} loading={loading} error={error} />
      </main>
    </main>
  );
};

export default Homepage;
