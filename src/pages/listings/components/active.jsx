/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState } from "react";
import { Grid, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NFTListingCard } from "./ListingCard";

export const ActiveListings = (props) => {
  const { view } = props;
  const [isLoading, setIsLoading] = useState(true);
    const activeListings = useSelector(state => state.listings.activeListings);
  useEffect(()=> {
    setIsLoading(true);
  }, []);
useEffect(()=> {
    if(activeListings.length > 0){
        setIsLoading(false);
    }
}, [activeListings])
  
  return (
    <Fragment>
      <Grid container spacing={2}>
        {view !== 1 &&
          activeListings.map((item, index) => {
            return (
              <Grid key={`index_${index}`} item xs={12} sm={6} md={view}>
                  <NFTListingCard listingItem={item} view={view} />
              </Grid>
            );
          })}
        {isLoading && (
          <div
            style={{
              textAlign: "center",
              width: "100%",
              marginTop: "10vh",
            }}
          >
            <CircularProgress color="primary" />
          </div>
        )}
      </Grid>
    </Fragment>
  );
};
