import { Box } from "@mui/material";
import Img from "assets/images/footer_img.png";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${Img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "5vh",
        padding: 10,
      }}
    ></Box>
  );
};

export default Footer;
