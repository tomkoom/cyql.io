import React from "react";
import css from "./FormContent.module.css";

// components
import { Categories, Grantee, Input, Select, TextArea } from "./index";

// inputs
import { main, socials, additional, nft, nftSaleStatusOptions } from "./inputs";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProject, setProject } from "@state/modals/projectModal";

const FormContent = () => {
  const dispatch = useDispatch();
  const p = useSelector(selectProject);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setProject({ [name]: value }));
  };

  return (
    <div className={css.formContent}>
      <div className={css.section}>
        <h5 className={css.title}>Main</h5>
        <Categories />

        {main.map((input) => (
          <Input
            id={input.id}
            label={input.label}
            type={input.type}
            value={p[input.id]}
            onChange={handleChange}
            key={input.id}
          />
        ))}

        <Grantee />

        <TextArea
          id="description"
          label="Description"
          value={p.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <div className={css.section}>
          <h5 className={css.sectionTitle}>Social networks</h5>
          {socials.map((input) => (
            <Input
              id={input.id}
              label={input.label}
              type={input.type}
              value={p[input.id]}
              onChange={handleChange}
              key={input.id}
            />
          ))}
        </div>

        <div className={css.section}>
          <h5 className={css.sectionTitle}>Additional info</h5>
          {additional.map((input) => (
            <Input
              id={input.id}
              label={input.label}
              type={input.type}
              value={p[input.id]}
              onChange={handleChange}
              key={input.id}
            />
          ))}
        </div>
      </div>

      {p.category.includes("NFTs") ? (
        <div className={css.section}>
          <h5 className={css.sectionTitle}>NFT data</h5>
          <Select
            id="nftSaleStatus"
            label="NFT sale status"
            value={p.nftSaleStatus}
            onChange={handleChange}
            selectOptions={nftSaleStatusOptions}
          />

          {nft.map((input) => (
            <Input
              id={input.id}
              label={input.label}
              type={input.type}
              value={p[input.id]}
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
