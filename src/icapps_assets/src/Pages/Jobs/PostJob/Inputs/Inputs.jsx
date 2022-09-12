import React from "react";
import css from "./Inputs.module.css";

// components
import { Input, Categories, TextArea, HowToApply, Publisher } from "./index.js";

const Inputs = () => {
  const jobCategories = {
    label: "Category",
    options: [
      { id: "frontend", label: "Frontend" },
      { id: "backend", label: "Backend" },
      { id: "full-stack", label: "Full Stack" },
      { id: "smart-contracts", label: "Smart Contracts" },
      { id: "defi", label: "DeFi" },
      { id: "nfts", label: "NFTs" },
      { id: "design", label: "Design" },
      { id: "community", label: "Community" },
      { id: "customer-support", label: "Customer Support" },
      { id: "copywriting", label: "Copywriting" },
      { id: "sales-marketing", label: "Sales & Marketing" },
      { id: "management", label: "Management" },
      { id: "other", label: "Other" },
    ],
  };
  const jobDescription = { id: "description" };

  return (
    <div className={css.inputs}>
      <div className={css.section}>
        <h3 className={css.title}>Position</h3>
        <div className={css.fields}>
          <Input
            id="title"
            type="text"
            label="Job title*"
            placeholder="e.g. Motoko Smart Contract Developer, Community Manager"
            note=""
            required={null}
            // required="required"
          />
          <Categories {...jobCategories} />
          <TextArea {...jobDescription} />
          <Input
            id="sourceUrl"
            type="text"
            label="Source URL"
            placeholder="Original job post"
            note=""
            required={null}
          />
          <Input
            id="compensation"
            type="text"
            label="Compensation"
            placeholder="Amount or minimum - maximum"
            note="This section is optional, but highly recommended."
            required={null}
          />
          <Input
            id="equity"
            type="text"
            label="Equity"
            placeholder="e.g. 0.01% - 1.0%"
            note="If equity is provided as part of the compensation package, please enter the percentage or specify a range."
            required={null}
          />
        </div>
      </div>

      <div className={css.section}>
        <h3 className={css.title}>Company Details</h3>
        <div className={css.fields}>
          <Input
            id="companyName"
            type="text"
            label="Company name"
            placeholder="Your company name"
            note=""
            required={null}
          />
          <Input
            id="comanyLogoUrl"
            type="text"
            label="Company logo URL"
            placeholder="Logo URL"
            note=""
            required={null}
          />
          <Input
            id="companyWebsite"
            type="text"
            label="Company website"
            placeholder="Website"
            note=""
            required={null}
          />
          <Input
            id="companyTwitter"
            type="text"
            label="Company Twitter"
            placeholder="Twitter URL"
            note=""
            required={null}
          />
        </div>
      </div>

      <div className={css.section}>
        <div className={css.title}>How to Apply</div>
        <div className={css.fields}>
          <HowToApply />
        </div>
      </div>

      <div className={css.section}>
        <div className={css.title}>Publisher</div>
        <div className={css.fields}>
          <Publisher />
        </div>
      </div>
    </div>
  );
};

export default Inputs;
