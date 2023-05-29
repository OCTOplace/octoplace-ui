import React from "react";
import backgroundImage from "../assets/bg.png";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

function Item(props) {
  return (
    <Paper
      style={{
        backgroundImage: `url(${props.item.image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "2rem",
        height: "50vh",
        cursor: "grab",
      }}
    >
      {/* <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
      <Button className="CheckButton">Check it out!</Button> */}
    </Paper>
  );
}

function CarouselHome() {
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
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

export default CarouselHome;
