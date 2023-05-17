import { Grid } from "@mui/material";
import React, { Fragment } from "react";
import { NFTListingCard } from "../pages/listings/components/ListingCard";

function CardList({ list, view }) {
  return (
    <Fragment>
      <Grid container spacing={2}>
        {view !== 1 &&
          list.length > 0 &&
          list.map((item, index) => {
            return (
              <Grid key={`index_${index}`} item xs={12} sm={6} md={view}>
                <NFTListingCard listingItem={item} view={view} />
              </Grid>
            );
          })}
      </Grid>
    </Fragment>
  );
}

export default CardList;
