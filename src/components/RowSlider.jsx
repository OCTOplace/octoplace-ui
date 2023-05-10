import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Tooltip from "@mui/material/Tooltip";
import { Container, Row, Col } from "react-bootstrap";
import infoIcon from "../assets/Infrormation_button.svg";
import nextIcon from "../assets/next.svg";
import prevIcon from "../assets/prev.svg";
import { Paper, Button, Grid, Box } from "@mui/material";
import { NFTListingCard } from "../pages/listings/components/ListingCard";
import MediaCard from "./MediaCard";

function RowSlider({ title, list }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const windowWidth = window.innerWidth;
  const [imgUrl, setImgUrl] = useState();

  const handlePrevClick = () => {
    console.log("list", Math.max(0, currentIndex - itemsPerPage));
    setCurrentIndex(() => Math.max(0, currentIndex - itemsPerPage));
  };

  const handleNextClick = () => {
    console.log("list", Math.min(currentIndex + itemsPerPage, list.length - 1));
    setCurrentIndex(() =>
      Math.min(currentIndex + itemsPerPage, list.length - 1)
    );
  };

  useEffect(() => {
    if (windowWidth < 768) {
      setItemsPerPage(1);
    } else if (windowWidth < 992) {
      setItemsPerPage(2);
    } else if (windowWidth < 1200) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(5);
    }
  }, [windowWidth]);

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
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {list
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map((item, i) => (
              <MediaCard item={item} key={i} />
            ))}
        </Container>
      </Carousel>
    </Box>
  );
}

export default RowSlider;
