import { Box, Tooltip } from "@mui/material";
import React, {  useEffect, useState } from "react";
import {  Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import infoIcon from "../../assets/Infrormation_button.svg";

import CardList from "../../components/CardList";
import RowSlider from "../../components/RowSlider";
import CarouselCollection from "../../components/CarouselCollection";

export const CollectionsPage = () => {
  const dispatch = useDispatch();
  // const collections = useSelector((state) => {
  //   console.log(state.collection.collections.slice(0,49));
  //   return state.collection.collections.slice(0,49)
  // });

  const collections = useSelector((state) => state.collection.collections);
  const [view, setView] = useState(2);

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
        {
          collections && <CardList list={collections} view={view} />
        }
      </Container>
    </Box>
  );
};
