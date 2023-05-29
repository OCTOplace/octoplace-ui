import React from "react";
import backgroundImage from "../assets/bg.png";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box, Typography } from "@mui/material";

import profileImage from "../assets/pp.png";
import { Container } from "react-bootstrap";

function CarouselCollection() {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      image: backgroundImage,
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      image: backgroundImage,
    },
    {
      name: "Random Name #3",
      description: "Hello World!",
      image: backgroundImage,
    },
  ];

  const styles = {
    container: {
      // position: "relative",
    },
    overlayContainer: {
      // position: "absolute",
      // top: 0,
      // left: 0,
      height: "45vh",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      zIndex: 3,
    },
    imageContainer: {},
    image: {
      width: "150px",
      height: "150px",
    },
    h1: {
      fontWeight: 600,
      fontSize: "2.5rem",
      lineHeight: "3rem",
      color: "#F4F4F4",
      WebkitTextStroke: "1.5px black",
      WebkitTextFillColor: "white",
    },
    whiteButton: {
      backgroundColor: "#f4f4f4",
      color: "#262626",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
      "&:hover": {
        backgroundColor: "#f4f4f4",
        color: "#262626",
        cursor: "pointer",
      },
    },
    // bgImage: {
    //   backgroundImage: `url(${props.item.image})`,
    //   backgroundPosition: "center",
    //   backgroundSize: "cover",
    //   backgroundRepeat: "no-repeat",
    //   padding: "2rem",
    //   height: "50vh",
    // },
  };

  return (
    <Carousel
      autoPlay={true}
      stopAutoPlayOnHover={true}
      swipe={true}
      duration={1000}
      animation="fade"
      cycleNavigation={true}
      activeIndicatorIconButtonProps={{
        style: {
          color: "#F78C09",
        },
      }}
      indicatorContainerProps={{
        style: {
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
          margin: "2rem 0",
        },
      }}
    >
      {items.map((item, i) => (
        <Box>
          <Paper
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              padding: "2rem",
              height: "50vh",
              cursor: "grab",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Container style={styles.overlayContainer}>
                <Box sx={styles.imageContainer}>
                  <img
                    src={profileImage}
                    alt="profileImage"
                    sx={styles.image}
                    width="180px"
                    height="180px"
                  />
                  <Typography sx={styles.h1}>{item?.name}</Typography>
                </Box>
                <Button sx={styles.whiteButton} variant="contained">
                  View Collection
                </Button>
              </Container>
            </Box>
          </Paper>
        </Box>
      ))}
    </Carousel>
  );
}

export default CarouselCollection;
