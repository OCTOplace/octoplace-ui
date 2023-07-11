import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/bg.png";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

function Item(props) {
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
    <Paper
      style={{
        backgroundImage: `url(${process.env.REACT_APP_API_URL}/assets/banners/${props.item.filename})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "2rem",
        height: "50vh",
        cursor: "grab",
      }}
      onClick={() => handleImageClick(props.item.url, '_blank')}
    >
      {/* <h2>{props.item.name}</h2>
      <p>{props.item.url}</p>
      <Button className="CheckButton">Check it out!</Button> */}
    </Paper>
  );
}

function CarouselHome() {
  const [items, setItems] = useState([]);
    
  const defaultItems = [
    {
      name: "Random Name #1",
      url: "",
      image: backgroundImage,
    },
    {
      name: "Random Name #2",
      url: "",
      image: backgroundImage,
    },
    {
      name: "Random Name #3",
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
      {
      items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

export default CarouselHome;
