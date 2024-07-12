import { Card } from "@mui/material";
import React from "react";

function CustomCard({ children }) {
  return (
    <Card
      sx={{
        width: { xs: "90%", md: "70%", lg: "50%" },
        boxShadow: " rgba(132, 59, 206, 0.15) 0px 4px 24px",
        border: "1px solid rgb(61, 34, 89)",
        background: "rgba(0,0,0,0.2)",
        borderRadius: "10px",
      }}
    >
      {children}
    </Card>
  );
}

export default CustomCard;
