"use client";

import React, { useRef, useState } from "react";
import styles from "./OtpInput.module.css";

export const OTPInput = ({
  length = 6,
  onChange = () => {},
  handleVerifyOTP,
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Automatically trigger handleVerifyOTP if all inputs are filled
    if (newOtp.every((digit) => digit !== "")) {
      handleVerifyOTP(newOtp.join(""));
    }

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

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length); // Get only the first `length` characters
    if (!/^\d+$/.test(pastedData)) return; // Ensure only digits are pasted

    const newOtp = pastedData.split("");
    while (newOtp.length < length) {
      newOtp.push("");
    }
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Automatically focus the last filled input
    const lastIndex = Math.min(pastedData.length - 1, length - 1);
    inputRefs.current[lastIndex]?.focus();

    // Automatically trigger handleVerifyOTP if all inputs are filled
    if (newOtp.every((digit) => digit !== "")) {
      handleVerifyOTP(newOtp.join(""));
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
          onPaste={(e) => index === 0 && handlePaste(e)} // Only handle paste on the first input
          ref={(ref) => (inputRefs.current[index] = ref)}
          className={styles.otpInput}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};
