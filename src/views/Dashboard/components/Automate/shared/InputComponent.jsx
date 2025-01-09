import React from "react";

const InputComponent = ({
  icon,
  placeholder,
  textButton,
  typeInput,
  labelTag,
}) => {
  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 12px 0px 12px",
        height: 32,
        borderRadius: "4px",
      }}
    >
      {labelTag && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "15px",
          }}
        >
          <span style={{ fontSize: "12px" }}>{labelTag}</span>
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            X
          </button>
        </div>
      )}
      <div style={{ display: "flex", gap: "5px", width: "100%" }}>
        {icon && <div>{icon}</div>}
        <input
          style={{
            backgroundColor: "transparent",
            border: "none",
            width: "60%",
          }}
          type={typeInput}
          placeholder={placeholder}
        />
      </div>

      <p
        style={{
          cursor: "pointer",
          fontSize: "12px",
          whiteSpace: "nowrap",
        }}
      >
        {textButton}
      </p>
    </div>
  );
};

export default InputComponent;
