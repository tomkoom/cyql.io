import React from "react";
import TextareaAutosize from "react-textarea-autosize";

const TextArea = () => {
  const inputStyle = {
    width: "100%",
    fontSize: "0.9rem",
    color: "var(--primaryColor)",
    backgroundColor: "var(--underlay)",
    caretColor: "var(--primaryColor)",
    padding: "1rem",
    margin: "0.25rem 0",
    border: "none",
    outline: "none",
    borderRadius: "0.25rem",
  };

  return (
    <div>
      <p className="label">Job description</p>
      <TextareaAutosize minRows={3} style={inputStyle} />
    </div>
  );
};

export default TextArea;
