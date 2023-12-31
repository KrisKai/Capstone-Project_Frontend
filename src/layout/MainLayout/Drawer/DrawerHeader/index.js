import PropTypes from "prop-types";

// material-ui
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project import
import DrawerHeaderStyled from "./DrawerHeaderStyled";

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <h1>Journey Sick</h1>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool,
};

export default DrawerHeader;
