import React from "react";
import css from "./FormContent.module.css";

// components
import { Categories, Grantee, Input, Select, Description } from "./index";

// inputs
import { main, socials, additional, nft, nftSaleStatusOptions } from "./inputs";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProject, setProject } from "@state/modals/projectModal/projectModal";

const FormContent = () => {
  const dispatch = useDispatch();
  const project = useSelector(selectProject);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setProject({ [name]: value }));
  };

  return (
    <div className={css.formContent}>
      <div className={css.section}>
        <Categories />
      </div>

      <div className={css.section}>
        <h5 className={css.title}>main</h5>
        {main.map((input) => (
          <Input
            id={input.id}
            label={input.label}
            type={input.type}
            value={project[input.id]}
            onChange={handleChange}
            key={input.id}
          />
        ))}
        <Description />
        <Grantee />
      </div>

      <div className={css.section}>
        <h5 className={css.sectionTitle}>social networks</h5>
        {socials.map((input) => (
          <Input
            id={input.id}
            label={input.label}
            type={input.type}
            value={project[input.id]}
            onChange={handleChange}
            key={input.id}
          />
        ))}
      </div>

      <div className={css.section}>
        <h5 className={css.sectionTitle}>additional info</h5>
        {additional.map((input) => (
          <Input
            id={input.id}
            label={input.label}
            type={input.type}
            value={project[input.id]}
            onChange={handleChange}
            key={input.id}
          />
        ))}
      </div>

      {project.category.includes("NFTs") ? (
        <div className={css.section}>
          <h5 className={css.sectionTitle}>nft data</h5>
          <Select
            id="nftSaleStatus"
            label="NFT sale status"
            value={project.nftSaleStatus}
            onChange={handleChange}
            selectOptions={nftSaleStatusOptions}
          />

          {nft.map((input) => (
            <Input
              id={input.id}
              label={input.label}
              type={input.type}
              value={project[input.id]}
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
