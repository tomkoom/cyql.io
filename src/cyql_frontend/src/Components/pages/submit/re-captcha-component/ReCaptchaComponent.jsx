import React from "react";

// ReCAPTCHA
import ReCAPTCHA from "react-google-recaptcha";
import { recaptchaSiteKey } from "@constants/constants";

const ReCaptchaComponent = ({ setIsVerified }) => {
  const onRecaptcha = () => {
    setIsVerified(true);
  };

  const recaptchaStyle = {
    margin: "0 auto",
  };

  return (
    <div style={recaptchaStyle}>
      <ReCAPTCHA sitekey={recaptchaSiteKey} onChange={onRecaptcha} />
      {/* Test recaptcha site key: 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI */}
    </div>
  );
};

export default ReCaptchaComponent;
