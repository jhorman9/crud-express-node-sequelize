import { TextField } from "@mui/material";
import React from "react";

function Input({ ...props }) {
  return (
    <TextField
      {...props}
      sx={{
        ".MuiOutlinedInput-root": {
          color: "#9c27b0",
        },
      }}
    />
  );
}

export default Input;
