import React from "react";

const LabelInputComponent = ({
  label,
  placeholder,
  inputType,
  isSelect,
  options,
}) => {
  return (
    <div>
      <label style={{ fontWeight: "bold" }} htmlFor="">
        {label}
      </label>
      {!isSelect ? (
        <input
          style={{
            backgroundColor: "#F2F2F2",
            borderRadius: "8px",
            height: 30,
            width: "100%",
            border: "none",
            padding: "8px",
          }}
          type={inputType}
          placeholder={placeholder}
        />
      ) : (
        <select
          style={{
            backgroundColor: "#F2F2F2",
            borderRadius: "8px",
            height: 30,
            width: "100%",
            border: "none",
            padding: "8px",
          }}
        >
          {options.map((option) => (
            <option key={option} value="">
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default LabelInputComponent;
