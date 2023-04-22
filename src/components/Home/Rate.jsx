import { Box, Card, Button, Fade, IconButton } from "@mui/material";
import { StarRounded } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const RateCard = (props) => {
  return (
    <Card sx={{ minWidth: "295px" }}>
      <Box display="flex" justifyContent="center">
        {Array(5)
          .fill()
          .map((_, idx) => (
            <StarRounded
              key={idx}
              htmlColor="#689F38"
              fontSize="large"
            ></StarRounded>
          ))}
      </Box>
      <Box padding={1}>
        Est sunt commodo ullamco voluptate fugiat voluptate laborum sint veniam
        officia anim tempor. Reprehenderit aute aliquip exercitation velit
        tempor nisi pariatur irure sit. Qui nostrud veniam deserunt fugiat. Sit
        tempor ut do commodo cillum ea minim. Anim fugiat quis non id. Quis do
        officia anim laborum deserunt nulla veniam officia est quis.
        <div>asdasdasdasd</div>
      </Box>
    </Card>
  );
};

const Rate = () => {
  const [test, setTest] = useState(6);
  const [a, setA] = useState(0);
  const x = useRef();
  const y = useRef();

  useEffect(() => {
    const r = x.current;
    console.log(y.current.clientWidth / 3);
    console.log((r.clientWidth - 15) / 4);
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
      <h1>Đánh giá của những người đã từng trải nghiệm</h1>
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
          {Array(test)
            .fill()
            .map((_, idx) => {
              return <RateCard idx={idx} />;
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

export default Rate;
