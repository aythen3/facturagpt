import React from "react";
import NewTag from "../../components/NewTag/NewTag";
import DiscardChanges from "../../components/DiscardChanges/DiscardChanges";
import SendToFolder from "../../components/SendToFolder/SendToFolder";
import AddTax from "../../components/AddTax/AddTax";
import NewFolder from "../../components/NewFolder/NewFolder";

const Test = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "45px" }}>
      <NewTag />
      <DiscardChanges />
      <SendToFolder />
      <AddTax />
      <NewFolder />
    </div>
  );
};

export default Test;
