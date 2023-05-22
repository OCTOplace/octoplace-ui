import { Box, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getActiveListings } from "../../utils/format-listings";
import { setActiveListings } from "../../redux/slices/listing-slice";

import infoIcon from "../../assets/Infrormation_button.svg";

import CardList from "../../components/CardList";
import RowSlider from "../../components/RowSlider";
import CarouselCollection from "../../components/CarouselCollection";

export const CollectionsPage = () => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.allListings);
  const activeListings = useSelector((state) => state.listings.activeListings);
  const [view, setView] = useState(2);

  useEffect(() => {
    if (listings.length > 0) {
      const active = getActiveListings(listings);
      dispatch(setActiveListings(active));
    }
  }, [listings]);

  return (
    <Box>
      <CarouselCollection />
      <RowSlider title="Popular Collections" />
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
            Collections
          </h3>
          <Tooltip title="Most Popular 12" placement="right">
            <img src={infoIcon} alt="" width={16} height={16} />
          </Tooltip>
        </Box>
        <CardList list={activeListings} view={view} />
      </Container>
    </Box>
  );
};
