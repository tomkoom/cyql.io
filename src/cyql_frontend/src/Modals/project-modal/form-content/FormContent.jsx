import React from "react";
import css from "./FormContent.module.css";

// components
import { Categories, Description, Grantee, Input, Meta } from "./index";

// inputs
import { main, socials, additional, nft } from "./inputs";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProjectDoc, setProjectDocData } from "@state/modals/projectModal/projectModal";

const FormContent = () => {
  const dispatch = useDispatch();
  const projectDoc = useSelector(selectProjectDoc);

  const handleChange = (e) => {
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
            label={input.label}
            type={input.type}
            value={projectDoc.data[input.id]}
            onChange={handleChange}
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
            label={input.label}
            type={input.type}
            value={projectDoc.data[input.id]}
            onChange={handleChange}
            key={input.id}
          />
        ))}
      </div>

      <div className={css.section}>
        <h5>additional info</h5>
        {additional.map((input) => (
          <Input
            id={input.id}
            label={input.label}
            type={input.type}
            value={projectDoc.data[input.id]}
            onChange={handleChange}
            key={input.id}
          />
        ))}
      </div>

      {projectDoc.data.category && projectDoc.data.category.includes("NFTs") ? (
        <div className={css.section}>
          <h5>nft data</h5>
          {nft.map((input) => (
            <Input
              id={input.id}
              label={input.label}
              type={input.type}
              value={projectDoc.data[input.id]}
              onChange={handleChange}
              key={input.id}
            />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FormContent;
