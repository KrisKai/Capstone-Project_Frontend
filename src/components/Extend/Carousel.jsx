import { Box } from "@mui/material";
import { useSnapCarousel } from "react-snap-carousel";

const Carousel = (props) => {
  const { scrollRef, prev, next } = useSnapCarousel();

  return (
    <Box position="relative" display="flex" mt={3}>
      <Box
        width="40px"
        sx={{
          transform: "translate(-65%, -50%)",
          aspectRatio: "1/1",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "gray",
          },
        }}
        position="absolute"
        top="50%"
        zIndex={9999}
        backgroundColor="white"
        borderRadius="50%"
        border="1px solid black"
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={() => prev()}
      >
        prev
      </Box>
      <Box
        display="flex"
        overflow="auto"
        gap={2}
        sx={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
        ref={scrollRef}
        paddingBottom={1}
      >
        {props.children}
      </Box>
      <Box
        position="absolute"
        right="0"
        top="50%"
        width="40px"
        sx={{
          transform: "translate(65%, -50%)",
          aspectRatio: "1/1",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "gray",
          },
        }}
        zIndex={9999}
        backgroundColor="white"
        borderRadius="50%"
        border="1px solid black"
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={() => next()}
      >
        next
      </Box>
    </Box>
  );
};

export default Carousel;
