/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import React from "react";
import CarouselHome from "../components/CarouselHome";
import RowSlider from "../components/RowSlider";
import { Box } from "@mui/material";
import TableComponent from "../components/TableComponent";

export const Home = () => {
  const navigate = useNavigate();

  const listData = [
    {
      serial: "1",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "2",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENG2",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "3",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA3",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "4",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA4",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "5",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA5",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "6",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA6",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "7",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA7",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "18",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA8",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "19",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA9",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "20",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA20",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "13",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA3",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "15",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA5",
      price: "0.15",
      offerId: "2345",
    },
  ];

  return (
    <Box>
      <CarouselHome />
      <RowSlider title="Popular Collections" list={listData} />
      <RowSlider title="Popular NFTs" list={listData} />
      <TableComponent list={listData} />
    </Box>
  );
};
