import { PLACE_API } from "config";
import {
  TextField,
  Button,
  Card,
  Typography,
  IconButton,
  Grid,
  Collapse,
  CardHeader,
  Box,
  CardMedia,
  Paper,
  CardContent,
  CardActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Carousel from "react-material-ui-carousel";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const PlaceCard = (props) => {
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        {props.group.map((item, i) => (
          <Card
            key={i}
            sx={{
              display: "flex",
              width: "250px",
              height: "70px",
              marginRight: "8px",
              borderStyle: "dashed",
              border: "1px",
            }}
          >
            <CardMedia
              component="img"
              image="https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
              sx={{ width: "30%" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              justifyContent="center"
              alignItems="center"
              marginLeft={1}
            >
              <Typography>{item.name}</Typography>
            </Box>
            <CardActions>Share</CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
};

const RecommendedPlaces = (props) => {
  const [open, setOpen] = useState(false);

  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
    {
      name: "Random Name #3",
      description: "This is the third random card!",
    },
    {
      name: "Random Name #4",
      description: "Another random card",
    },
    {
      name: "Random Name #5",
      description: "Yet another random card",
    },
    {
      name: "Random Name #6",
      description: "One more random card",
    },
  ];

  const groupedItems = [];
  for (let i = 0; i < items.length; i += 2) {
    const group = items.slice(i, i + 2);
    groupedItems.push(group);
  }

  return (
    <>
      <Box
        sx={{
          margin: 1,
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={1}>
            <IconButton
              onClick={() => setOpen(!open)}
              aria-label="expand"
              size="small"
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={11} pt={0.5}>
            Gợi ý địa điểm
          </Grid>
        </Grid>
        <div>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Carousel
              sx={{
                height: "130px",
              }}
            >
              {groupedItems.map((group, index) => (
                <PlaceCard key={index} group={group} />
              ))}
            </Carousel>
          </Collapse>
        </div>
        <hr />
      </Box>
    </>
  );
};

export default RecommendedPlaces;
