import React, { useState, useEffect, useRef } from "react";
import css from "./Category.module.css";

// components
import { Btn, /* CategoryList */ CategoryListModal } from "./index";

const Category = () => {
  const [openCategoryList, setOpenCategoryList] = useState(false);
  const categoryBtnRef = useRef(null);

  // prevent from scrolling when modal is active
  useEffect(() => {
    if (openCategoryList) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openCategoryList]);

  return (
    <div className={css.category}>
      <div onClick={() => setOpenCategoryList((prev) => !prev)} ref={categoryBtnRef}>
        <Btn />
      </div>
      {/* <div className={css.categoryList}>
        {openCategoryList && (
          <CategoryList
            openCategoryList={openCategoryList}
            setOpenCategoryList={setOpenCategoryList}
            categoryBtnRef={categoryBtnRef}
          />
        )}
      </div> */}
      {openCategoryList && (
        <CategoryListModal
          openCategoryList={openCategoryList}
          setOpenCategoryList={setOpenCategoryList}
        />
      )}
    </div>
  );
};

export default Category;
