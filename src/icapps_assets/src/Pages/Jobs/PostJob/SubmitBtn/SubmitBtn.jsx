import React from "react";

const SubmitBtn = ({ submissionLoader }) => {
  return (
    <div>
      <button className="submitBtn" type="submit">
        {submissionLoader ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default SubmitBtn;
