import { Box, Typography } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";

const UserSuggest = () => {
  return (
    <Box width="100%">
      <Box display="flex" alignItems="center" gap={5} width="100%">
        <Box width="30%">
          <Typography variant="h2" marginLeft={10}>
            Gợi ý địa điểm
          </Typography>
          <Box width="50%" border="1px solid black" mt={1} marginLeft={10}></Box>
        </Box>
        <Box width="70%">
          <Box sx={{ backgroundColor: "#D1D1D1" }} width="100%">
            <Carousel>
              <Carousel.Item>
                <Box>
                  <Box width="100%">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                      style={{ width: "100%" }}
                    />
                  </Box>
                </Box>
              </Carousel.Item>
              <Carousel.Item>
                <Box>
                  <Box>
                    <img
                      src="https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                      style={{ width: "100%" }}
                    />
                  </Box>
                </Box>
              </Carousel.Item>
              <Carousel.Item>
                <Box>
                  <Box>
                    <img
                      src="https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                      style={{ width: "100%" }}
                    />
                  </Box>
                </Box>
              </Carousel.Item>
            </Carousel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserSuggest;
