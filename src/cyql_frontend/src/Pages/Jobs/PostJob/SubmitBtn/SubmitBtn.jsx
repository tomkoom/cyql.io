import React from "react";

const SubmitBtn = ({ isSubmitting }) => {
  return (
    <div>
      <button className="submitBtn" type="submit">
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default SubmitBtn;
