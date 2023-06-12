// ElementMaker.js

import { TextField } from "@mui/material";
import React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

// Create an ElementMakerForSDate component
function ElementMakerForSDate(props) {
  console.log(props.value);
  return (
    <span>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        props.showInputSDate ? (
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            dateLibInstance={dayjs.utc}
          >
            <MobileDatePicker
              required
              sx={{ width: "120px" }}
              id="estimateStartDate"
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

export default ElementMakerForSDate;
