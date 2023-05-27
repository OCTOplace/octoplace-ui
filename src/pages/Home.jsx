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
import Market from "./market/Market";
import { Container } from "react-bootstrap";
import MarketMenu from "../components/MarketMenu";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.allListings);
  const activeListings = useSelector((state) => state.listings.activeListings);
  const [view, setView] = useState(3);
  const [orderMethod, setOrderMethod] = useState("Price: Low to High");

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
      {/* <TableComponent list={activeListings} /> */}
      <Container>
        <MarketMenu slug="home" />
      </Container>
    </Box>
  );
};
