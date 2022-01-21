import React from "react";
import css from "./Apps.module.css";
import { SearchBar, Tags, AppList, CategoryBtns } from "../";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setSearchProjects } from "../../State/searchProjectsSlice";

const Apps = ({
  category,
  setCategory,
  filteredProjects,
  data,
  loading,
  error,
}) => {
  // state
  const searchProjectsValue = useSelector(
    (state) => state.searchProjects.value
  );
  const dispatch = useDispatch();
  const searchProjects = (e) => {
    dispatch(setSearchProjects(e.target.value));
  };

  return (
    <main className={css.apps}>
      <h2 className="pageTitle">Discover new projects</h2>

      <SearchBar
        searchValue={searchProjectsValue}
        search={searchProjects}
        inputName="projects-search"
      />

      <Tags />

      <CategoryBtns
        category={category}
        setCategory={setCategory}
        data={data}
        loading={loading}
      />

      <AppList
        filteredProjects={filteredProjects}
        searchValue={searchProjectsValue}
        loading={loading}
        error={error}
      />
    </main>
  );
};

export default Apps;
