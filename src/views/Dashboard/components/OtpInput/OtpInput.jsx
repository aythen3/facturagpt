"use client";

import React, { useRef, useState } from "react";
import styles from "./OtpInput.module.css";

export const OTPInput = ({ length = 6, onChange = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Move to next input if current field is filled
    if (element.value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={styles.otpGroup}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(ref) => (inputRefs.current[index] = ref)}
          className={styles.otpInput}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};
