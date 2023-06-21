// ElementMaker.js

import { TextField } from "@mui/material";
import React from "react";

// Create an ElementMaker component
function ElementMaker(props) {
  return (
    <span>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        props.showInputTripName ? (
          <TextField
            type="text"
            value={props.value}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            autoFocus
            fullWidth
            multiline
            row={3}
          />
        ) : (
          <span
            onDoubleClick={props.handleDoubleClick}
            style={{
              display: "inline-block",
              height: "25px",
              minWidth: "300px",
            }}
          >
            {props.value}
          </span>
        )
      }
    </span>
  );
}

export default ElementMaker;
