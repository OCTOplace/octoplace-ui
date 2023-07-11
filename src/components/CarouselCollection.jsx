import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/bg.png";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box, Typography } from "@mui/material";

import profileImage from "../assets/pp.png";
import { Container } from "react-bootstrap";

function CarouselCollection() {
  const [items, setItems] = useState([]);
    
  const defaultItems = [
    {
      name: "Banner1",
      url: "",
      image: backgroundImage,
    },
    {
      name: "Banner2",
      url: "",
      image: backgroundImage,
    },
    {
      name: "Banner3",
      url: "",
      image: backgroundImage,
    },
  ];

  const downloadBanners = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(apiUrl + '/banners/lists');

      if (response.ok) {
        const bannerInfos = await response.json();
        setItems(bannerInfos);
      } else {
        console.error('Failed to get banner file');
        setItems(defaultItems)
      }
    } catch (error) {
      console.error('Error downloading banner file:', error);
      setItems(defaultItems)
    }
  };

  useEffect(() => {
    downloadBanners();
  }, []);

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

  function isUrl(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }

  const handleImageClick = (url) => {
    if (isUrl(url)) {
      window.open(url, '_blank');
    }    
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
      {items.map((item, index) => (
        <Box key={`index_${index}`}>
          <Paper
            style={{
              backgroundImage: `url(${process.env.REACT_APP_API_URL}/assets/banners/${item.filename})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              padding: "2rem",
              height: "50vh",
              cursor: "grab",
            }}
            onClick={() => handleImageClick(item.url, '_blank')}
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
