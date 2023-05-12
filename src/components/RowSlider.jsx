import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Tooltip from "@mui/material/Tooltip";
import { Container, Row, Col } from "react-bootstrap";
import infoIcon from "../assets/Infrormation_button.svg";
import nextIcon from "../assets/next.svg";
import prevIcon from "../assets/prev.svg";
import { Paper, Button, Grid, Box, useMediaQuery } from "@mui/material";
import { NFTListingCard } from "../pages/listings/components/ListingCard";
import MediaCard from "./MediaCard";

function RowSlider({ title, list }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const windowWidth = window.innerWidth;
  const isXSmallScreen = useMediaQuery("(max-width: 600px)");
  const isSmallScreen = useMediaQuery(
    "(min-width: 601px) and (max-width: 900px)"
  );
  const isMediumScreen = useMediaQuery(
    "(min-width: 901px) and (max-width: 1200px)"
  );
  const isLargeScreen = useMediaQuery(
    "(min-width: 1201px) and (max-width: 1535px)"
  );
  const isXLargeScreen = useMediaQuery("(min-width: 1536px)");

  let numItemsToShow = 3;
  if (isXSmallScreen) {
    numItemsToShow = 1;
  } else if (isSmallScreen) {
    numItemsToShow = 2;
  } else if (isLargeScreen) {
    numItemsToShow = 4;
  } else if (isXLargeScreen) {
    numItemsToShow = 6;
  }

  const handlePrevClick = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0));
  };

  const handleNextClick = () => {
    console.log("currentIndex", currentIndex);
    const nextIndex = currentIndex + 1;
    if (nextIndex >= list.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  return (
    <Box
      sx={{
        mb: 4,
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            mb: 2,
            gap: 1,
          }}
        >
          <h3
            style={{
              color: "#f4f4f4",
              margin: 0,
            }}
          >
            {title}
          </h3>
          <Tooltip title="Most Popular 12" placement="right">
            <img src={infoIcon} alt="" width={16} height={16} />
          </Tooltip>
        </Box>
      </Container>
      <Carousel
        autoPlay={false}
        animation="slide"
        cycleNavigation={true}
        indicators={true}
        showArrows={true}
        navButtonsAlwaysVisible={true}
        navButtonsProps={{
          style: {
            margin: "1rem 5vw",
            backgroundColor: "transparent",
          },
        }}
        NextIcon={<img src={nextIcon} alt="next icon" width={24} height={24} />}
        PrevIcon={<img src={prevIcon} alt="prev icon" width={24} height={24} />}
        next={handleNextClick}
        prev={handlePrevClick}
      >
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          {list
            .slice(
              currentIndex -
                Math.max(currentIndex + numItemsToShow - list.length, 0),
              currentIndex + numItemsToShow
            )
            .map((item, i) => {
              return (
                <Grid key={`index_${i}`} item xs={12} sm={6} md={4} lg={2}>
                  <MediaCard item={item} key={i} view={3} />
                </Grid>
              );
            })}
        </Container>
      </Carousel>
    </Box>
  );
}

export default RowSlider;
