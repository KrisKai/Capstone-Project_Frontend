// ElementMaker.js
import React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

// Create an ElementMakerForEDate component
function ElementMakerForEDate(props) {
  console.log(props.value);
  return (
    <span>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        props.showInputEDate ? (
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            dateLibInstance={dayjs.utc}
          >
            <MobileDatePicker
              required
              sx={{ width: "120px" }}
              id="estimateEndDate"
              value={dayjs.utc(props.value)}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              onClose={props.handleBlur}
            />
          </LocalizationProvider>
        ) : (
          <span
            onDoubleClick={props.handleDoubleClick}
            style={{
              display: "inline-block",
              height: "25px",
            }}
          >
            {dayjs(props.value).format("MMM D")}
          </span>
        )
      }
    </span>
  );
}

export default ElementMakerForEDate;
