import React from "react";
import css from "./FormContent.module.css";

// components
import { Categories, Description, Grantee, Input, Meta } from "./_index";

// inputs
import { main, socials, additional, nft } from "./inputs";

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { selectProjectDoc, setProjectDocData } from "@/state/modals/projectModal/projectModal";

const FormContent = () => {
  const dispatch = useAppDispatch();
  const projectDoc = useAppSelector(selectProjectDoc);

  const updateProjectDocData = (e) => {
    const { name, value } = e.target;
    dispatch(setProjectDocData({ [name]: value }));
  };

  return (
    <div className={css.formContent}>
      <div className={css.section}>
        <Categories />
      </div>

      <div className={css.section}>
        <h5>main</h5>
        {main.map((input) => (
          <Input
            id={input.id}
            label={input.id}
            type={input.type}
            value={projectDoc.data[input.id]}
            onChange={updateProjectDocData}
            key={input.id}
          />
        ))}
        <Description />
        <Grantee />
        <Meta />
      </div>

      <div className={css.section}>
        <h5>social networks</h5>
        {socials.map((input) => (
          <Input
            id={input.id}
            label={input.id}
            type={input.type}
            value={projectDoc.data[input.id]}
            onChange={updateProjectDocData}
            key={input.id}
          />
        ))}
      </div>

      <div className={css.section}>
        <h5>additional info</h5>
        {additional.map((input) => (
          <Input
            id={input.id}
            label={input.id}
            type={input.type}
            value={projectDoc.data[input.id]}
            onChange={updateProjectDocData}
            key={input.id}
          />
        ))}
      </div>

      {projectDoc.data.categories && projectDoc.data.categories.includes("NFTs") && (
        <div className={css.section}>
          <h5>nft data</h5>
          {nft.map((input) => (
            <Input
              id={input.id}
              label={input.id}
              type={input.type}
              value={projectDoc.data[input.id]}
              onChange={updateProjectDocData}
              key={input.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FormContent;
