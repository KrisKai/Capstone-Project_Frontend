import { Box, Card, CardMedia, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image1 from "assets/images/unsplash_1.png";
import Image2 from "assets/images/unsplash_2.png";
import Image3 from "assets/images/unsplash_3.png";
import Image4 from "assets/images/unsplash_4.png";

const list = [Image1, Image2, Image3, Image4];

const RateCard = (props) => {
  return (
    <Card sx={{ minWidth: "295px", minHeight: "200px" }}>
      <CardMedia image={props.data} sx={{ height: "100%" }}></CardMedia>
    </Card>
  );
};

const Explore = () => {
  const [test, setTest] = useState(6);
  const [a, setA] = useState(0);
  const x = useRef();
  const y = useRef();

  useEffect(() => {
    const r = x.current;
    // console.log(y.current.clientWidth / 3);
    // console.log((r.clientWidth - 15) / 4);
    const childCount = r.childElementCount;
    const scrollWidth = r.childNodes[0].scrollWidth;
    x.current.scrollTo({
      top: 0,
      left: (scrollWidth + 5) * a,
      behavior: "smooth",
    });
  }, [a]);

  return (
    <div>
      <h1>Khám phá điểm đến ngẫu hứng của bạn</h1>
      <Box display="flex" alignItems="center" position="relative" py="5px">
        <Box position="absolute" left="-20px">
          <IconButton
            onClick={() => setA(a - 1)}
            sx={{
              borderRadius: "50%",
              paddingLeft: "17px",
              border: "1px solid black",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            <ArrowBackIosIcon color="black" />
          </IconButton>
        </Box>

        <Box
          display="flex"
          gap="10px"
          py="5px"
          sx={{
            overflowX: "scroll",
            "::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
          ref={x}
        >
          {list.map((data, idx) => {
            return <RateCard key={idx} data={data} />;
          })}
        </Box>

        <Box position="absolute" right="-17px">
          <IconButton
            onClick={() => setA(a + 1)}
            sx={{
              borderRadius: "50%",
              border: "1px solid black",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box backgroundColor="#D1D1D1" ref={y} width="70%" borderRadius="8px">
          <Box
            backgroundColor="#000000B2"
            height="10px"
            width="283px"
            borderRadius="8px"
            sx={{
              transform: `translateX(${a * 283}px)`,
              transitionDuration: "0.6s",
            }}
          ></Box>
        </Box>
      </Box>
    </div>
  );
};

export default Explore;
