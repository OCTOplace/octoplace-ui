/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import CarouselHome from "../components/CarouselHome";
import RowSlider from "../components/RowSlider";
import TableComponent from "../components/TableComponent";
import { getActiveListings } from "../utils/format-listings";
import { setActiveListings } from "../redux/slices/listing-slice";
import { PopularNFTs } from "./analytics/popular-nfts";
import { PopularCollections } from "./analytics/popular-collections";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.allListings);
  const activeListings = useSelector((state) => state.listings.activeListings);
  const [view, setView] = useState(3);
  const [orderMethod, setOrderMethod] = useState("Price: Low to High");

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

  useEffect(() => {
    if (listings.length > 0) {
      const active = getActiveListings(listings);
      dispatch(setActiveListings(active));
    }
  }, [listings]);

  return (
    <Box>
      <CarouselHome />
      <PopularCollections title="Popular Collections" />
      <PopularNFTs title="Popular NFTs" />
      <TableComponent list={activeListings} />
    </Box>
  );
};
